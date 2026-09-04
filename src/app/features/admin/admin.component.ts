/* ==========================================================================
   admin.component.ts — the local administration screens.

   Three views share this component, selected by the route's `data.view`.

   The content editor is a faithful port of the CBT DataService pattern —
   remote rows layered over seed data — with localStorage standing in for the
   database. Edits never touch the files in core/data; they are stored as a
   patch and merged at read time by StoreService, and "reset to seed" discards
   the patch entirely.

   adminGuard mirrors the CBT guard: navigation, not a security boundary.
   ========================================================================== */

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { I18nService } from '../../core/services/i18n.service';
import { StoreService, CollectionName } from '../../core/services/store.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from '../../shared/components/icon.component';
import type { Bilingual } from '../../core/models';

/** Which field of each collection is the human-readable label. */
const LABEL_FIELD: Record<CollectionName, string> = {
  thinkers: 'name',
  practices: 'title',
  lexicon: 'term',
  scenarios: 'title',
  givens: 'title'
};

const STAT_KEYS: { name: CollectionName; key: string }[] = [
  { name: 'thinkers', key: 'admin.stat.thinkers' },
  { name: 'practices', key: 'admin.stat.practices' },
  { name: 'lexicon', key: 'admin.stat.lexicon' },
  { name: 'scenarios', key: 'admin.stat.scenarios' }
];

@Component({
  selector: 'app-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule, IconComponent],
  template: `
<section class="page-head">
  <div class="wrap">
    <div class="page-head-grid">
      <div class="page-head-title">
        <span class="demo-badge">
          <app-icon name="info" cls="icon-sm" />{{ i18n.t('common.demo') }}
        </span>
        <h1 class="t-title" style="margin-top:1.25rem">{{ i18n.t('admin.title') }}</h1>
      </div>
      <div class="page-head-aside">
        <p class="t-body muted">{{ i18n.t('admin.lead') }}</p>
      </div>
    </div>

    <nav class="filter-bar" style="margin-top:2.5rem" aria-label="admin">
      <a class="chip chip-btn" [class.chip-active]="view() === 'dashboard'" routerLink="/admin">
        {{ i18n.t('admin.overview') }}</a>
      <a class="chip chip-btn" [class.chip-active]="view() === 'content'" routerLink="/admin/content">
        {{ i18n.t('admin.content') }}</a>
      <a class="chip chip-btn" [class.chip-active]="view() === 'users'" routerLink="/admin/users">
        {{ i18n.t('admin.users') }}</a>
    </nav>
  </div>
</section>

<section class="wrap" style="padding-bottom:6rem">

  @switch (view()) {

    @case ('content') {
      <div class="filter-bar" style="margin-bottom:1.75rem">
        @for (name of store.collections; track name) {
          <button type="button" class="chip chip-btn"
                  [attr.aria-pressed]="collection() === name"
                  (click)="collection.set(name)">{{ name }}</button>
        }
        @if (store.overrideCount()) {
          <button type="button" class="btn btn-quiet btn-sm" style="margin-left:auto"
                  (click)="resetSeed()">
            <app-icon name="rotate-ccw" cls="icon-sm" />{{ i18n.t('admin.resetSeed') }}
          </button>
        }
      </div>

      <div class="rows">
        @for (row of rows(); track row.id) {
          <div class="row-item">
            <span class="row-num"><app-icon name="circle-dot" cls="icon-sm" /></span>
            <div>
              <p class="t-body strong">{{ label(row) }}</p>
              <p class="t-micro" style="margin-top:.2rem">{{ row.id }}</p>
            </div>
            <span></span>
            <button type="button" class="btn btn-ghost btn-sm" (click)="openEditor(row.id)">
              <app-icon name="pencil" cls="icon-sm" />{{ i18n.t('common.edit') }}
            </button>
          </div>
        }
      </div>

      @if (editingId(); as id) {
        <div class="drawer">
          <div class="drawer-scrim" (click)="closeEditor()"></div>
          <div class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="editorTitle">
            <div class="drawer-top">
              <h2 class="t-subtitle" id="editorTitle" style="font-size:1.0625rem">
                {{ i18n.t('common.edit') }}
              </h2>
              <button type="button" class="icon-btn" [attr.aria-label]="i18n.t('common.close')"
                      (click)="closeEditor()">
                <app-icon name="x" />
              </button>
            </div>

            <p class="t-micro" style="margin-bottom:1.25rem">{{ id }}</p>

            <label class="field-label" for="editKa">ქართული</label>
            <textarea class="field" id="editKa" rows="3" [(ngModel)]="draftKa"></textarea>

            <label class="field-label" for="editEn" style="margin-top:1rem">English</label>
            <textarea class="field" id="editEn" rows="3" [(ngModel)]="draftEn"></textarea>

            <div style="display:flex;gap:.75rem;margin-top:1.5rem;flex-wrap:wrap">
              <button type="button" class="btn btn-primary" (click)="saveEditor()">
                <app-icon name="save" cls="icon-sm" />{{ i18n.t('common.save') }}
              </button>
              <button type="button" class="btn btn-ghost" (click)="closeEditor()">
                {{ i18n.t('common.cancel') }}
              </button>
            </div>
          </div>
        </div>
      }
    }

    @case ('users') {
      @if (auth.users().length) {
        <div class="rows">
          @for (user of auth.users(); track user.id) {
            <div class="row-item">
              <span class="row-num"><app-icon name="user" cls="icon-sm" /></span>
              <div>
                <p class="t-body strong">{{ user.name || user.email }}</p>
                <p class="t-micro" style="margin-top:.2rem">{{ user.email }}</p>
              </div>
              <div class="tags" style="align-self:center">
                <span class="chip" [class.chip-accent]="user.role === 'admin'">
                  {{ i18n.t(user.role === 'admin' ? 'admin.roleAdmin' : 'admin.roleUser') }}
                </span>
                <span class="chip">{{ i18n.formatDate(user.createdAt) }}</span>
              </div>
              <button type="button" class="btn btn-quiet btn-sm" (click)="auth.deleteUser(user.id)">
                <app-icon name="trash-2" cls="icon-sm" />{{ i18n.t('common.delete') }}
              </button>
            </div>
          }
        </div>
      } @else {
        <p class="t-body muted">{{ i18n.t('admin.noUsers') }}</p>
      }
    }

    @default {
      <div class="game-grid">
        @for (stat of stats; track stat.name) {
          <div class="card">
            <span class="stat-num">{{ store.collection(stat.name).length }}</span>
            <span class="t-micro">{{ i18n.t(stat.key) }}</span>
          </div>
        }
      </div>

      <div class="card card-xl" style="margin-top:2rem">
        <h2 class="t-subtitle">{{ i18n.t('admin.overrides') }}</h2>
        <p class="t-body muted" style="margin-top:.75rem">
          @if (store.overrideCount()) {
            {{ i18n.t('admin.overrides') }}: {{ store.overrideCount() }}
          } @else {
            {{ i18n.t('admin.overridesNone') }}
          }
        </p>
        @if (store.overrideCount()) {
          <button type="button" class="btn btn-ghost btn-sm" style="margin-top:1.25rem"
                  (click)="resetSeed()">
            <app-icon name="rotate-ccw" cls="icon-sm" />{{ i18n.t('admin.resetSeed') }}
          </button>
        }
      </div>

      <div class="game-grid" style="margin-top:2rem">
        <a class="card card-hover card-sweep game-card" routerLink="/admin/content">
          <span class="game-card-icon"><app-icon name="pencil" /></span>
          <h3 class="t-subtitle" style="font-size:1.125rem">{{ i18n.t('admin.content') }}</h3>
        </a>
        <a class="card card-hover card-sweep game-card" routerLink="/admin/users">
          <span class="game-card-icon"><app-icon name="users" /></span>
          <h3 class="t-subtitle" style="font-size:1.125rem">{{ i18n.t('admin.users') }}</h3>
        </a>
      </div>
    }
  }

</section>
  `
})
export class AdminComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly store = inject(StoreService);
  private readonly confirm = inject(ConfirmService);
  protected readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  protected readonly stats = STAT_KEYS;

  protected readonly view = toSignal(
    this.route.data.pipe(map(data => (data['view'] as string) ?? 'dashboard')),
    { initialValue: (this.route.snapshot.data['view'] as string) ?? 'dashboard' }
  );

  protected readonly collection = signal<CollectionName>('thinkers');
  protected readonly editingId = signal<string | null>(null);
  protected draftKa = '';
  protected draftEn = '';

  protected readonly rows = computed(() => this.store.collection(this.collection()));

  protected label(row: { id: string } & Record<string, unknown>): string {
    const field = LABEL_FIELD[this.collection()];
    const value = row[field] as Bilingual | undefined;
    return value ? this.i18n.pick(value) : row.id;
  }

  protected openEditor(id: string): void {
    const row = this.rows().find(item => item.id === id) as Record<string, unknown> | undefined;
    if (!row) return;
    const value = row[LABEL_FIELD[this.collection()]] as Bilingual | undefined;
    this.draftKa = value?.ka ?? '';
    this.draftEn = value?.en ?? '';
    this.editingId.set(id);
  }

  protected closeEditor(): void {
    this.editingId.set(null);
  }

  protected saveEditor(): void {
    const id = this.editingId();
    if (!id) return;
    this.store.setOverride(this.collection(), id, {
      [LABEL_FIELD[this.collection()]]: { ka: this.draftKa, en: this.draftEn }
    });
    this.closeEditor();
  }

  protected async resetSeed(): Promise<void> {
    const confirmed = await this.confirm.ask({
      title: this.i18n.t('admin.resetTitle'),
      message: this.i18n.t('admin.resetConfirm'),
      confirmLabel: this.i18n.t('common.delete'),
      cancelLabel: this.i18n.t('common.cancel'),
      icon: 'rotate-ccw'
    });
    if (!confirmed) return;
    this.store.resetOverrides();
  }
}
