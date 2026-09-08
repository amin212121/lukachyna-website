import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { TranslatedTitleStrategy } from './core/services/translated-title.strategy'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideClientHydration(withEventReplay()),
    { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
  ],
}
