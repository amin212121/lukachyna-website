import { Injectable, effect, inject, signal } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { RouterStateSnapshot, TitleStrategy } from '@angular/router'
import { TranslationService } from './translation.service'

/**
 * Resolves route titles through the translation dictionaries, so the browser tab
 * follows the active language instead of being fixed to English.
 *
 * Routes carry a translation key in their `title` rather than literal text.
 */
@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title)
  private readonly translation = inject(TranslationService)
  private readonly key = signal<string | undefined>(undefined)

  constructor() {
    super()
    // Keeps the tab in step when the language is switched without navigating.
    // Effects do not run during prerendering, which is why updateTitle also
    // applies the title directly.
    effect(() => this.apply())
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.key.set(this.buildTitle(snapshot))
    this.apply()
  }

  private apply(): void {
    const key = this.key()
    if (key) {
      this.title.setTitle(this.translation.translate(key))
    }
  }
}
