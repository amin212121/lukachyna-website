import { Component } from '@angular/core'
import { SearchBarComponent } from '../../../shared/components/widgets/search-bar/search-bar.component'
import { AppearanceSelectorComponent } from '../../../shared/components/elements/appearance-selector/appearance-selector.component'
import { RouterLink } from '@angular/router'
import { LanguageSelectorComponent } from '../../../shared/components/elements/language-selector/language-selector.component'

@Component({
  selector: 'ly-header-component',
  templateUrl: './header.component.html',
  imports: [RouterLink, SearchBarComponent, AppearanceSelectorComponent, LanguageSelectorComponent],
  standalone: true,
})
export class HeaderComponent {
  isMobileMenuOpen = false

  mobileMenuClickHandler(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }
}
