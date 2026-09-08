import { Component } from '@angular/core'
import { LegalDocComponent } from '../../shared/components/modules/legal-doc/legal-doc.component'
import { TranslatePipe } from '../../shared/pipes/translate.pipe'
import { TERMS_DOC } from '../../core/i18n/legal'

/**
 * Public offer — the payment, delivery and refund terms LiqPay requires a merchant
 * site to publish before an account is approved.
 */
@Component({
  selector: 'ly-terms-page',
  standalone: true,
  imports: [LegalDocComponent, TranslatePipe],
  template: `
    <ly-legal-doc
      [docTitle]="'legal.termsTitle' | translate"
      [docSub]="'legal.termsSub' | translate"
      [blocks]="doc"
    />
  `,
})
export class TermsComponent {
  readonly doc = TERMS_DOC
}
