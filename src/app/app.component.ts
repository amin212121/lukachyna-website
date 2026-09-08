import { Component, effect, inject } from '@angular/core'
import { DOCUMENT, ViewportScroller, isPlatformBrowser } from '@angular/common'
import { PLATFORM_ID } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './core/components/header/header.component'
import { FooterComponent } from './core/components/footer/footer.component'
import { TranslationService } from './core/services/translation.service'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Lukachyna website'

  private readonly document = inject(DOCUMENT)
  private readonly platformId = inject(PLATFORM_ID)
  private readonly viewportScroller = inject(ViewportScroller)
  private readonly translation = inject(TranslationService)

  constructor() {
    // Set synchronously so prerendered HTML carries the right lang attribute,
    // then keep it in step with the language selector in the browser.
    this.applyHtmlLang()
    effect(() => this.applyHtmlLang())

    if (isPlatformBrowser(this.platformId)) {
      // The router scrolls to fragments with window.scrollTo, which ignores the
      // scroll-margin-top on the target. Match that 5rem here so a linked section
      // heading lands with the same breathing room either way. Root font size is
      // viewport-based, so this is read at scroll time rather than fixed.
      this.viewportScroller.setOffset(() => {
        const rootFontSize = parseFloat(
          getComputedStyle(this.document.documentElement).fontSize,
        )
        return [0, rootFontSize * 5]
      })
    }
  }

  private applyHtmlLang(): void {
    this.document.documentElement.setAttribute('lang', this.translation.htmlLang())
  }
}
