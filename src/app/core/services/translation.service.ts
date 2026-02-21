import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { en } from '../i18n/en'
import { ua } from '../i18n/ua'

export type Language = 'en' | 'ua'

type Translations = typeof en

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly platformId = inject(PLATFORM_ID)
  private readonly _language = signal<Language>(this.getInitialLanguage())

  readonly language = this._language.asReadonly()

  private readonly _translations = computed<Translations>(() =>
    this._language() === 'ua' ? ua : en,
  )

  setLanguage(lang: Language): void {
    this._language.set(lang)
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang)
    }
  }

  translate(key: string): string {
    const t = this._translations()
    const keys = key.split('.')
    let value: unknown = t
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k]
    }
    return typeof value === 'string' ? value : key
  }

  private getInitialLanguage(): Language {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('lang')
      if (saved === 'en' || saved === 'ua') return saved
    }
    return 'en'
  }
}