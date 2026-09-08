import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { en } from '../i18n/en'
import { ua } from '../i18n/ua'
import { Localized } from '../config/merchant.config'

export type Language = 'en' | 'ua'

type Translations = typeof en

/**
 * Ukrainian is the default for every visitor who has not chosen otherwise.
 *
 * LiqPay requires the Ukrainian version to open automatically for visitors from
 * Ukraine, citing part 6 of article 27 of the Law of Ukraine "On ensuring the
 * functioning of Ukrainian as the state language". The site is served as static
 * files with no server to geolocate a request, so it defaults to Ukrainian for
 * everyone — which satisfies the requirement rather than approximating it. A
 * visitor who prefers English switches once and the choice is remembered.
 */
const DEFAULT_LANGUAGE: Language = 'ua'

/** BCP 47 codes for the <html lang> attribute. Ukrainian is 'uk'; 'ua' is a country. */
const HTML_LANG: Record<Language, string> = { en: 'en', ua: 'uk' }

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly platformId = inject(PLATFORM_ID)
  private readonly _language = signal<Language>(this.getInitialLanguage())

  readonly language = this._language.asReadonly()

  /** BCP 47 code for the active language, for the <html lang> attribute. */
  readonly htmlLang = computed<string>(() => HTML_LANG[this._language()])

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

  /**
   * Resolve a bilingual value from configuration or document content.
   * Used for data that lives outside the translation dictionaries — the service
   * catalogue and the legal documents.
   */
  pick<T>(value: Localized<T>): T {
    return value[this._language()]
  }

  private getInitialLanguage(): Language {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('lang')
      if (saved === 'en' || saved === 'ua') return saved
    }
    return DEFAULT_LANGUAGE
  }
}
