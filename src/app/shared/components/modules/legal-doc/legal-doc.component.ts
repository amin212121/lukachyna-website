import { Component, inject, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslatePipe } from '../../../pipes/translate.pipe'
import { TranslationService } from '../../../../core/services/translation.service'
import { LegalBlock } from '../../../../core/i18n/legal'
import {
  LEGAL_UPDATED,
  Localized,
  MERCHANT,
  TAX_ID_LABEL,
  isMerchantConfigured,
} from '../../../../core/config/merchant.config'

/**
 * Layout shared by the public offer and the privacy notice.
 *
 * Both documents close with the seller's details, which LiqPay requires to be
 * published on the site (R10). They are rendered from configuration rather than
 * written into the document text, so there is one place to keep them current.
 *
 * The contents links use routerLink + fragment rather than a plain href="#id".
 * index.html sets <base href="/">, and a fragment-only href resolves against the
 * base URL, not the current address — so on /terms it would send the reader to
 * the home page. Anchor scrolling is switched on in app.config.ts.
 */
@Component({
  selector: 'ly-legal-doc',
  templateUrl: './legal-doc.component.html',
  styleUrl: './legal-doc.component.scss',
  standalone: true,
  imports: [TranslatePipe, RouterLink],
})
export class LegalDocComponent {
  readonly docTitle = input.required<string>()
  readonly docSub = input.required<string>()
  readonly blocks = input.required<LegalBlock[]>()

  private readonly translation = inject(TranslationService)

  readonly merchant = MERCHANT
  readonly updated = LEGAL_UPDATED
  readonly taxIdLabel = TAX_ID_LABEL[MERCHANT.entityType]
  readonly configured = isMerchantConfigured()

  pick<T>(value: Localized<T>): T {
    return this.translation.pick(value)
  }

  sectionId(index: number): string {
    return `section-${index + 1}`
  }

  padIndex(index: number): string {
    return (index + 1).toString().padStart(2, '0')
  }
}
