import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslatePipe } from '../../../shared/pipes/translate.pipe'
import { TranslationService } from '../../services/translation.service'
import {
  Localized,
  MERCHANT,
  TAX_ID_LABEL,
  isMerchantConfigured,
} from '../../config/merchant.config'

@Component({
  selector: 'ly-footer-component',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [TranslatePipe, RouterLink],
})
export class FooterComponent {
  private readonly translation = inject(TranslationService)

  readonly merchant = MERCHANT
  readonly taxIdLabel = TAX_ID_LABEL[MERCHANT.entityType]
  readonly configured = isMerchantConfigured()

  pick<T>(value: Localized<T>): T {
    return this.translation.pick(value)
  }
}
