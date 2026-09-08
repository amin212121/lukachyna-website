import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslatePipe } from '../../shared/pipes/translate.pipe'

/**
 * Catch-all page for URLs the router cannot match.
 *
 * Without it an unknown URL left the outlet empty and rendered a blank page —
 * the kind of dead section LiqPay flags when reviewing a merchant site.
 *
 * The status code is still 200: nginx rewrites any unmatched path to
 * index.html, so the 404 exists in the app, not in the response.
 */
@Component({
  selector: 'ly-not-found-page',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
})
export class NotFoundComponent {
  /** The sections worth offering someone who landed on a dead URL. */
  readonly links = [
    { path: '/', key: 'nav.home' },
    { path: '/services', key: 'nav.services' },
    { path: '/projects', key: 'nav.projects' },
    { path: '/blog', key: 'nav.blog' },
    { path: '/publications', key: 'nav.publications' },
    { path: '/contact', key: 'nav.contact' },
  ]
}
