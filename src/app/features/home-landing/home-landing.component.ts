import { Component } from '@angular/core'
import { LivingPortraitComponent } from '../../core/components/living-portrait/living-portrait.component'

@Component({
  templateUrl: './home-landing.component.html',
  imports: [LivingPortraitComponent],
  standalone: true,
})
export class HomeLandingComponent {}
