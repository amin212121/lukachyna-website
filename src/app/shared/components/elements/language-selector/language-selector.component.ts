import { Component, inject } from '@angular/core'
import { TranslationService } from '../../../../core/services/translation.service'

@Component({
  selector: 'ly-language-selector',
  templateUrl: './language-selector.component.html',
  standalone: true,
})
export class LanguageSelectorComponent {
  protected readonly ts = inject(TranslationService)

  toggle(): void {
    this.ts.setLanguage(this.ts.language() === 'en' ? 'ua' : 'en')
  }
}