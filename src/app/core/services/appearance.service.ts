import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

export type Theme = 'dark' | 'light'

@Injectable({ providedIn: 'root' })
export class AppearanceService {
  private readonly platformId = inject(PLATFORM_ID)
  private readonly _theme = signal<Theme>(this.getInitialTheme())

  readonly theme = this._theme.asReadonly()

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme(this._theme())
    }
  }

  toggle(): void {
    this.setTheme(this._theme() === 'dark' ? 'light' : 'dark')
  }

  private setTheme(theme: Theme): void {
    this._theme.set(theme)
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme)
      this.applyTheme(theme)
    }
  }

  private applyTheme(theme: Theme): void {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }

  private getInitialTheme(): Theme {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') return saved
    }
    return 'dark'
  }
}