/* ==========================================================================
   hero-scene.component.ts — the WebGL field behind the hero.

   The rest of the platform draws its atmosphere with flat SVG: a horizon, a
   light source, a few arcs. This is the same picture with real depth — a plane
   of drifting points under exponential fog, a distant glow at the horizon, and
   a camera that eases towards the mouse and sinks as the page scrolls.

   Why points rather than geometry: a solid object would need a subject, and
   the subject here is a mood. A field has no centre to be wrong about, it
   tessellates to any aspect ratio, and forty thousand of them cost one draw
   call.

   Everything expensive is conditional:

     · Three.js is a dynamic import, so it stays out of the initial bundle and
       is never fetched during prerendering.
     · No WebGL, or prefers-reduced-motion, means the canvas is never created
       and the CSS gradient underneath is what you see. That fallback is a real
       design, not a blank box.
     · The loop stops when the hero scrolls out of view or the tab is hidden,
       and the device pixel ratio is capped at 2 — past that it is heat, not
       resolution.
   ========================================================================== */

import {
  ChangeDetectionStrategy, Component, ElementRef, OnDestroy, PLATFORM_ID,
  afterNextRender, inject, signal, viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Points per axis; 200 x 200 is 40,000 points in a single draw call. */
const GRID = 200;
/** World size of the field. Wider than the camera ever sees, so it has no edge. */
const SPREAD = 260;

@Component({
  selector: 'app-hero-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas class="hero-canvas" aria-hidden="true"
                     [class.is-live]="live()"></canvas>`,
  styles: [':host { display: contents; }']
})
export class HeroSceneComponent implements OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Fades the canvas in only once there is something on it. */
  protected readonly live = signal(false);

  private dispose: (() => void) | null = null;

  constructor() {
    afterNextRender(() => void this.start());
  }

  ngOnDestroy(): void {
    this.dispose?.();
  }

  private async start(): Promise<void> {
    if (!this.isBrowser) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = this.canvasRef().nativeElement;

    // A context probe before the import: on a machine without WebGL there is
    // no point fetching 600KB to find that out.
    const probe = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!probe) return;

    const THREE = await import('three');

    // Measure the canvas, not its parent: the host is display: contents and so
    // has no box at all, and the canvas is inset: 0 on the section, which makes
    // its own CSS box exactly the stage. setSize(..., false) touches only the
    // drawing buffer, so observing it cannot feed back into a resize loop.
    const size = () => ({
      width: canvas.clientWidth || 1,
      height: canvas.clientHeight || 1
    });

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();

    // Read the palette off the page rather than hardcoding it, so the scene
    // follows the theme toggle like everything else.
    const styles = getComputedStyle(document.documentElement);
    const token = (name: string, fallback: string) =>
      new THREE.Color((styles.getPropertyValue(name) || fallback).trim());

    const glow = token('--a-400', '#60A5FA');
    const deep = token('--n-950', '#0B0F14');
    scene.fog = new THREE.FogExp2(deep.getHex(), 0.007);

    const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 400);
    camera.position.set(0, 7, 24);

    /* ---- the field ------------------------------------------------------ */

    const count = GRID * GRID;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    let i = 0;
    for (let x = 0; x < GRID; x++) {
      for (let z = 0; z < GRID; z++) {
        // Jittered rather than square: a perfect lattice moirés against the
        // pixel grid and reads as a screen door.
        positions[i * 3]     = (x / (GRID - 1) - 0.5) * SPREAD + (Math.random() - 0.5) * 1.4;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (z / (GRID - 1) - 0.5) * SPREAD + (Math.random() - 0.5) * 1.4;
        seeds[i] = Math.random();
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));

    // Displacement and fade happen on the GPU. Doing this on the CPU would be
    // 40,000 writes and a buffer upload every frame.
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime:  { value: 0 },
        uGlow:  { value: new THREE.Vector3(glow.r, glow.g, glow.b) },
        uFog:   { value: scene.fog.density },
        uPixel: { value: Math.min(devicePixelRatio, 2) }
      },
      vertexShader: `
        attribute float seed;
        uniform float uTime;
        uniform float uPixel;
        varying float vFade;

        void main() {
          vec3 pos = position;

          // Two crossed waves at different rates never repeat visibly, and
          // cost less than any noise function worth the name.
          float wave = sin(pos.x * 0.055 + uTime * 0.34) * 1.9
                     + sin(pos.z * 0.041 - uTime * 0.23) * 2.3
                     + sin((pos.x + pos.z) * 0.021 + uTime * 0.15) * 1.5;
          pos.y += wave + seed * 0.9;

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          float dist = -mv.z;

          // Near points would otherwise blow out under additive blending.
          vFade = smoothstep(1.0, 7.0, dist) * (1.0 - smoothstep(100.0, 210.0, dist));
          vFade *= 0.45 + seed * 0.55;

          gl_PointSize = (78.0 / max(dist, 1.0)) * uPixel;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uGlow;
        varying float vFade;

        void main() {
          // Round the square point sprite and soften its edge.
          vec2 d = gl_PointCoord - 0.5;
          float r = dot(d, d);
          if (r > 0.25) discard;
          float alpha = (1.0 - smoothstep(0.0, 0.25, r)) * vFade;
          gl_FragColor = vec4(uGlow, alpha);
        }
      `
    });

    const field = new THREE.Points(geometry, material);
    field.position.y = -9;
    scene.add(field);

    /* ---- the horizon glow ----------------------------------------------- */

    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(300, 160),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uGlow: { value: new THREE.Vector3(glow.r, glow.g, glow.b) } },
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: `
          uniform vec3 uGlow;
          varying vec2 vUv;
          void main() {
            float d = distance(vUv, vec2(0.5, 0.35));
            gl_FragColor = vec4(uGlow, (1.0 - smoothstep(0.0, 0.5, d)) * 0.5);
          }
        `
      })
    );
    halo.position.set(0, 2, -80);
    scene.add(halo);

    /* ---- input ---------------------------------------------------------- */

    let pointerX = 0, pointerY = 0;      // target, -1..1
    let easedX = 0, easedY = 0;          // what the camera actually follows
    let scroll = 0;

    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / innerWidth) * 2 - 1;
      pointerY = (event.clientY / innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll = Math.min(1, scrollY / Math.max(innerHeight, 1));
    };

    addEventListener('pointermove', onPointer, { passive: true });
    addEventListener('scroll', onScroll, { passive: true });

    const resize = () => {
      const { width, height } = size();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    /* ---- the loop ------------------------------------------------------- */

    // Offscreen or backgrounded, the loop stops entirely rather than running
    // into a compositor that will throw the frame away.
    let visible = true;
    const seen = new IntersectionObserver(
      entries => { visible = entries[0].isIntersecting; if (visible) tick(); },
      { threshold: 0 }
    );
    seen.observe(canvas);

    const onVisibility = () => { if (!document.hidden && visible) tick(); };
    document.addEventListener('visibilitychange', onVisibility);

    const clock = new THREE.Clock();
    let frame = 0;
    let running = false;

    const render = () => {
      running = true;
      if (!visible || document.hidden) { running = false; return; }
      frame = requestAnimationFrame(render);

      const time = clock.getElapsedTime();
      material.uniforms['uTime'].value = time;

      // Ease rather than track: a camera locked to the cursor feels twitchy,
      // and this is meant to drift.
      easedX += (pointerX - easedX) * 0.025;
      easedY += (pointerY - easedY) * 0.025;

      camera.position.x = easedX * 8;
      camera.position.y = 7 - easedY * 2.5 - scroll * 10;
      camera.position.z = 24 + scroll * 34;
      camera.lookAt(easedX * 2, -2 - scroll * 4, -60);

      renderer.render(scene, camera);
    };
    const tick = () => { if (!running) render(); };

    onScroll();
    render();
    this.live.set(true);

    this.dispose = () => {
      cancelAnimationFrame(frame);
      removeEventListener('pointermove', onPointer);
      removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      seen.disconnect();
      geometry.dispose();
      material.dispose();
      halo.geometry.dispose();
      (halo.material as { dispose(): void }).dispose();
      renderer.dispose();
    };
  }
}
