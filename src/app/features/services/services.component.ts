import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslatePipe } from '../../shared/pipes/translate.pipe'
import { TranslationService } from '../../core/services/translation.service'
import {
  ADDITIONAL_SERVICES,
  FEATURED_SERVICE,
  Localized,
} from '../../core/config/merchant.config'

/**
 * The offer. LiqPay requires a full list of what is sold, each entry carrying a
 * short description and a price that is not zero.
 *
 * Nothing is paid for on this page: a service links through to contact, and
 * payment is invoiced through LiqPay once the scope is agreed.
 */
@Component({
  selector: 'ly-services-page',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
})
export class ServicesComponent {
  private readonly translation = inject(TranslationService)

  readonly featured = FEATURED_SERVICE
  readonly additional = ADDITIONAL_SERVICES

  readonly steps = ['services.step1', 'services.step2', 'services.step3', 'services.step4']

  pick<T>(value: Localized<T>): T {
    return this.translation.pick(value)
  }

  /**
   * Thousands separated with a plain space. Deliberately not Intl.NumberFormat —
   * the server and the browser can disagree on the separator, which shows up as a
   * hydration mismatch on a prerendered page.
   */
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  padIndex(index: number): string {
    return (index + 1).toString().padStart(2, '0')
  }
}
