import { Component } from '@angular/core'
import { SearchBarComponent } from '../../../shared/components/widgets/search-bar/search-bar.component'
import {
  AppearanceSelectorComponent,
} from '../../../shared/components/elements/appearance-selector/appearance-selector.component'
import { RouterLink } from '@angular/router'
import {
  LanguageSelectorComponent,
} from '../../../shared/components/elements/language-selector/language-selector.component'

@Component({
  selector: 'ly-footer-component',
  templateUrl: './footer.component.html',
  standalone: true,
})

export class FooterComponent {
}
