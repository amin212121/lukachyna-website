import { Component } from '@angular/core'
import { LegalDocComponent } from '../../shared/components/modules/legal-doc/legal-doc.component'
import { TranslatePipe } from '../../shared/pipes/translate.pipe'
import { PRIVACY_DOC } from '../../core/i18n/legal'

/**
 * Privacy notice. Required because the site keeps preferences in the visitor's
 * browser and processes contact details when a service is ordered.
 */
@Component({
  selector: 'ly-privacy-page',
  standalone: true,
  imports: [LegalDocComponent, TranslatePipe],
  template: `
    <ly-legal-doc
      [docTitle]="'legal.privacyTitle' | translate"
      [docSub]="'legal.privacySub' | translate"
      [blocks]="doc"
    />
  `,
})
export class PrivacyComponent {
  readonly doc = PRIVACY_DOC
}
