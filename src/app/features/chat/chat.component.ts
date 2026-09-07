/* ==========================================================================
   chat.component.ts — the practice conversation.

   Three states: pick a chair, have the conversation, and (in client mode)
   compare afterwards. The crisis card can interrupt any of them. A history
   rail sits alongside, so leaving a conversation no longer means losing it.

   Prerendered like every other route, and that is deliberate rather than
   incidental: the heading, the lead, the mode picker, the disclaimer and the
   crisis information are all real content that should exist for a reader
   without JavaScript and for a search engine. Only the behaviour is
   browser-only, guarded by ChatService.

   The transcript deliberately does not animate. Everywhere else on this site
   new content rises into place; a conversation someone is thinking in front of
   is the one place where that reads as restless rather than considered.
   ========================================================================== */

import {
  ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID,
  computed, effect, inject, signal, untracked, viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService } from '../../core/services/store.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { ChatService, type ChatMode, type ChatSession } from '../../core/services/chat.service';
import { CRISIS_SERVICES, CRISIS_VERIFIED } from '../../core/data/crisis.data';
import { IconComponent } from '../../shared/components/icon.component';

/** Grows the composer with its content, up to the CSS max-height. */
function autosize(field: HTMLTextAreaElement): void {
  field.style.height = 'auto';
  field.style.height = `${field.scrollHeight}px`;
}

@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
<section class="chat-field">
  <div class="wrap on-plate">
    <p class="t-eyebrow"><span>{{ i18n.t('chat.eyebrow') }}</span></p>
    <h1 class="t-title" style="margin-top:1rem">{{ i18n.t('chat.title') }}</h1>
    <p class="t-body measure" style="margin-top:1rem">{{ i18n.t('chat.lead') }}</p>
  </div>
</section>

<section class="wrap" style="padding-block:2.5rem 6rem">
  <div class="chat-layout">

    <!-- ---- history rail ------------------------------------------------- -->
    <aside class="chat-rail">
      <div class="chat-rail-top">
        <h2 class="t-micro">{{ i18n.t('chat.history') }}</h2>
        @if (chat.sessions().length) {
          <button type="button" class="btn btn-quiet btn-sm" (click)="clearAll()">
            {{ i18n.t('chat.clearAll') }}
          </button>
        }
      </div>

      <button type="button" class="chat-new" (click)="chat.newConversation()">
        <app-icon name="plus" cls="icon-sm" />{{ i18n.t('chat.restart') }}
      </button>

      @if (chat.sessions().length) {
        <ul class="chat-list">
          @for (session of chat.sessions(); track session.id) {
            <li class="chat-list-item" [class.is-active]="session.id === chat.activeId()">
              <button type="button" class="chat-list-open" (click)="chat.open(session.id)">
                <span class="t-body strong">{{ session.title || i18n.t('chat.untitled') }}</span>
                <span class="t-micro muted">
                  {{ label(session) }} · {{ i18n.t('chat.turnCount', { count: session.turns.length }) }}
                </span>
              </button>
              <button type="button" class="icon-btn chat-list-del"
                      [attr.aria-label]="i18n.t('chat.delete')"
                      (click)="remove(session)">
                <app-icon name="trash-2" cls="icon-sm" />
              </button>
            </li>
          }
        </ul>
      } @else {
        <p class="t-micro muted" style="margin-top:1rem">{{ i18n.t('chat.history.empty') }}</p>
      }
    </aside>

    <!-- ---- the conversation --------------------------------------------- -->
    <div class="chat-main">

      @if (!chat.active()) {
        <h2 class="t-subtitle">{{ i18n.t('chat.mode.pick') }}</h2>

        <div class="chat-modes">
          <button type="button" class="chat-mode"
                  [attr.aria-pressed]="draftMode() === 'therapist'"
                  (click)="draftMode.set('therapist')">
            <span class="chat-mode-glyph" aria-hidden="true"><app-icon name="feather" /></span>
            <span class="t-subtitle" style="font-size:1.0625rem">{{ i18n.t('chat.mode.therapist.title') }}</span>
            <span class="t-body muted">{{ i18n.t('chat.mode.therapist.lead') }}</span>
          </button>

          <button type="button" class="chat-mode"
                  [attr.aria-pressed]="draftMode() === 'client'"
                  (click)="draftMode.set('client')">
            <span class="chat-mode-glyph" aria-hidden="true"><app-icon name="users" /></span>
            <span class="t-subtitle" style="font-size:1.0625rem">{{ i18n.t('chat.mode.client.title') }}</span>
            <span class="t-body muted">{{ i18n.t('chat.mode.client.lead') }}</span>
          </button>
        </div>

        @if (draftMode() === 'client') {
          <h3 class="t-subtitle" style="margin-top:2rem;font-size:1.0625rem">
            {{ i18n.t('chat.mode.client.choose') }}
          </h3>
          <div class="chat-people">
            @for (scenario of store.scenarios(); track scenario.id) {
              <button type="button" class="chat-person"
                      [attr.aria-pressed]="draftScenario() === scenario.id"
                      (click)="draftScenario.set(scenario.id)">
                <app-icon [name]="scenario.icon" cls="icon-sm" />
                <span>
                  <span class="t-body strong" style="display:block">{{ i18n.pick(scenario.person) }}</span>
                  <span class="t-micro muted">{{ i18n.pick(scenario.title) }}</span>
                </span>
              </button>
            }
          </div>
        }

        <div style="display:flex;gap:.75rem;margin-top:2rem;flex-wrap:wrap">
          <button type="button" class="btn btn-primary" [disabled]="!canBegin()" (click)="begin()">
            {{ i18n.t('chat.begin') }}<app-icon name="arrow-right" cls="icon-sm" />
          </button>
        </div>
      }

      @else {
        <p class="t-micro">
          @if (chat.mode() === 'client' && scenario(); as person) {
            {{ i18n.t('chat.client') }} · {{ i18n.pick(person.person) }}
          } @else {
            {{ i18n.t('chat.therapist') }}
          }
        </p>

        <div class="chat-log">
          @for (turn of chat.turns(); track turn.id) {
            <article class="chat-turn" [class.is-you]="turn.role === 'user'">
              <span class="quiz-mark" aria-hidden="true">
                <app-icon [name]="turn.role === 'user' ? 'user' : speakerIcon()" cls="icon-sm" />
              </span>
              <div>
                <p class="t-micro muted chat-speaker">{{ speakerLabel(turn.role) }}</p>
                <div class="prose t-body">
                  @for (paragraph of paragraphs(turn.text); track $index) { <p>{{ paragraph }}</p> }
                </div>
              </div>
            </article>
          }

          <!-- The in-flight reply. Its own block, so the list above is not
               re-diffed on every token. -->
          @if (chat.streaming(); as live) {
            <article class="chat-turn" aria-live="polite" aria-busy="true">
              <span class="quiz-mark" aria-hidden="true"><app-icon [name]="speakerIcon()" cls="icon-sm" /></span>
              <div>
                <p class="t-micro muted chat-speaker">{{ speakerLabel('assistant') }}</p>
                <div class="prose t-body">
                  @for (paragraph of paragraphs(live); track $index) { <p>{{ paragraph }}</p> }
                </div>
              </div>
            </article>
          } @else if (chat.status() === 'sending') {
            <p class="t-micro muted" role="status" aria-live="polite">{{ i18n.t('chat.thinking') }}</p>
          }
        </div>

        @if (chat.crisis()) {
          <div class="chat-crisis" role="alert">
            <div style="display:flex;align-items:center;gap:.85rem">
              <span class="chat-mode-glyph" aria-hidden="true"><app-icon name="shield" /></span>
              <h2 class="t-subtitle" style="font-size:1.0625rem">{{ i18n.t('chat.crisis.title') }}</h2>
            </div>
            <p class="t-body" style="margin-top:1rem">{{ i18n.t('chat.crisis.body') }}</p>

            @if (services().length) {
              <div class="chat-services">
                @for (service of services(); track service.number) {
                  <a class="chat-service" [href]="'tel:' + service.number">
                    <app-icon name="phone" cls="icon-sm" />
                    <span>
                      <span class="t-body strong" style="display:block">{{ i18n.pick(service.name) }}</span>
                      <span class="t-micro muted">{{ i18n.pick(service.hours) }}</span>
                    </span>
                    <span class="chat-number">{{ service.number }}</span>
                  </a>
                }
              </div>
            } @else {
              <p class="t-body muted" style="margin-top:1rem">{{ i18n.t('chat.crisis.fallback') }}</p>
            }

            <button type="button" class="btn btn-ghost" style="margin-top:1.5rem" (click)="chat.dismissCrisis()">
              {{ i18n.t('chat.crisis.dismiss') }}
            </button>
          </div>
        }

        @if (chat.error(); as key) {
          <p class="field-error" role="status" style="margin-top:1rem">{{ i18n.t(key) }}</p>
        }

        <!-- ---- composer: one shell, the control inside it --------------- -->
        <div class="chat-composer">
          <textarea #input class="chat-input" rows="1"
                    [attr.aria-label]="i18n.t('chat.send')"
                    [attr.placeholder]="placeholder()"
                    [disabled]="!isBrowser"
                    (input)="onInput()"
                    (keydown)="onKey($event)"></textarea>

          <div class="chat-composer-bar">
            <span class="t-micro muted">{{ i18n.t('chat.hint') }}</span>

            @if (chat.busy()) {
              <button type="button" class="btn btn-ghost btn-sm" (click)="chat.stop()">
                <app-icon name="square" cls="icon-sm" />{{ i18n.t('chat.stop') }}
              </button>
            } @else {
              <button type="button" class="btn btn-primary btn-sm"
                      [disabled]="!isBrowser" (click)="send()">
                {{ i18n.t('chat.send') }}<app-icon name="send" cls="icon-sm" />
              </button>
            }
          </div>
        </div>

        <p class="t-micro muted" style="margin-top:.6rem">{{ i18n.t('learn.savedLocally') }}</p>

        <!-- ---- debrief, client mode only ------------------------------- -->
        @if (chat.canDebrief() && scenario(); as person) {
          <div class="card outcomes" style="margin-top:2.5rem">
            <p class="t-micro" style="color:var(--accent)">{{ i18n.t('chat.debrief.title') }}</p>
            <p class="t-body muted" style="margin-top:.5rem">{{ i18n.t('chat.debrief.lead') }}</p>

            @if (debriefOpen()) {
              <div class="prose t-body" style="margin-top:1.25rem">
                @for (paragraph of paragraphs(i18n.pick(person.therapistResponse)); track $index) {
                  <p>{{ paragraph }}</p>
                }
              </div>
              <p class="t-micro" style="margin-top:1.5rem;color:var(--accent)">
                {{ i18n.t('chat.debrief.prompt') }}
              </p>
              <p class="t-body" style="margin-top:.4rem">{{ i18n.pick(person.reflectionPrompt) }}</p>
              <a class="link-draw" [routerLink]="['/scenarios', person.id]" style="margin-top:1.25rem">
                {{ i18n.t('common.readMore') }}<app-icon name="arrow-right" cls="icon-sm" />
              </a>
            } @else {
              <button type="button" class="btn btn-ghost" style="margin-top:1.25rem"
                      (click)="debriefOpen.set(true)">
                {{ i18n.t('chat.debrief.reveal') }}
              </button>
            }
          </div>
        }
      }

      <div class="chat-note">
        <app-icon name="info" cls="icon-sm" />
        <span class="t-micro">{{ i18n.t('chat.disclaimer') }} {{ i18n.t('chat.privacy') }}</span>
      </div>
    </div>
  </div>
</section>
  `
})
export class ChatComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  protected readonly chat = inject(ChatService);
  private readonly confirm = inject(ConfirmService);
  protected readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly input = viewChild<ElementRef<HTMLTextAreaElement>>('input');

  protected readonly draftMode = signal<ChatMode | null>(null);
  protected readonly draftScenario = signal<string | null>(null);
  protected readonly debriefOpen = signal(false);

  constructor() {
    // Switching conversations closes a revealed debrief and resets the
    // composer's grown height, which would otherwise carry over.
    effect(() => {
      this.chat.activeId();
      untracked(() => {
        this.debriefOpen.set(false);
        const field = this.input()?.nativeElement;
        if (field) {
          field.value = '';
          field.style.height = 'auto';
        }
      });
    });
  }

  protected readonly canBegin = computed(() => {
    const mode = this.draftMode();
    if (!mode) return false;
    return mode === 'therapist' || !!this.draftScenario();
  });

  protected readonly scenario = computed(() => {
    const id = this.chat.scenarioId();
    return id ? this.store.scenario(id) ?? null : null;
  });

  /** In client mode the AI is the client; in therapist mode it is the therapist. */
  protected readonly speakerIcon = computed(() =>
    this.chat.mode() === 'client' ? 'message-circle' : 'feather'
  );

  protected readonly placeholder = computed(() => {
    if (!this.isBrowser) return this.i18n.t('chat.placeholderOffline');
    return this.chat.mode() === 'client'
      ? this.i18n.t('chat.placeholder.client')
      : this.i18n.t('chat.placeholder.therapist');
  });

  protected readonly services = computed(() => (CRISIS_VERIFIED ? CRISIS_SERVICES : []));

  /** The rail's second line: which chair this conversation was, and with whom. */
  protected label(session: ChatSession): string {
    if (session.mode !== 'client') return this.i18n.t('chat.therapist');
    const person = session.scenarioId ? this.store.scenario(session.scenarioId) : null;
    return person ? this.i18n.pick(person.person) : this.i18n.t('chat.client');
  }

  protected speakerLabel(role: 'user' | 'assistant'): string {
    if (role === 'user') return this.i18n.t('chat.you');
    return this.chat.mode() === 'client' ? this.i18n.t('chat.client') : this.i18n.t('chat.therapist');
  }

  protected paragraphs(text: string): string[] {
    return text.split('\n\n').filter(Boolean);
  }

  protected begin(): void {
    const mode = this.draftMode();
    if (!mode) return;
    this.chat.begin(mode, mode === 'client' ? this.draftScenario() : null);
    this.draftMode.set(null);
    this.draftScenario.set(null);
  }

  protected onInput(): void {
    const field = this.input()?.nativeElement;
    if (field) autosize(field);
  }

  protected send(): void {
    const field = this.input()?.nativeElement;
    if (!field) return;
    const text = field.value;
    if (!text.trim()) return;
    field.value = '';
    field.style.height = 'auto';
    void this.chat.send(text, this.i18n.lang());
  }

  /** Enter sends; Shift+Enter is a new line, as the hint under the field says. */
  protected onKey(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    this.send();
  }

  protected async remove(session: ChatSession): Promise<void> {
    const confirmed = await this.confirm.ask({
      title: this.i18n.t('chat.deleteTitle'),
      message: this.i18n.t('chat.deleteConfirm'),
      confirmLabel: this.i18n.t('common.delete'),
      cancelLabel: this.i18n.t('common.cancel'),
      icon: 'trash-2'
    });
    if (confirmed) this.chat.remove(session.id);
  }

  protected async clearAll(): Promise<void> {
    const confirmed = await this.confirm.ask({
      title: this.i18n.t('chat.clearAllTitle'),
      message: this.i18n.t('chat.clearAllConfirm'),
      confirmLabel: this.i18n.t('common.delete'),
      cancelLabel: this.i18n.t('common.cancel'),
      icon: 'trash-2'
    });
    if (confirmed) this.chat.clearAll();
  }
}
