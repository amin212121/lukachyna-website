import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { AppearanceSelectorComponent } from '../../../shared/components/elements/appearance-selector/appearance-selector.component'
import { RouterLink } from '@angular/router'
import { LanguageSelectorComponent } from '../../../shared/components/elements/language-selector/language-selector.component'
import { TranslatePipe } from '../../../shared/pipes/translate.pipe'

@Component({
  selector: 'ly-header-component',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterLink, AppearanceSelectorComponent, LanguageSelectorComponent, TranslatePipe],
  standalone: true,
})
export class HeaderComponent {
  isMobileMenuOpen = false

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  toggleMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : ''
    }
  }

  closeMenu(): void {
    if (!this.isMobileMenuOpen) return
    this.isMobileMenuOpen = false
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = ''
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu()
  }
}