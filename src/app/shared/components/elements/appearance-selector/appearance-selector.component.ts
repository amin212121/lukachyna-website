import { Component, inject } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { AppearanceService } from '../../../../core/services/appearance.service'

@Component({
  selector: 'ly-appearance-selector',
  templateUrl: './appearance-selector.component.html',
  imports: [NgOptimizedImage],
  standalone: true,
})
export class AppearanceSelectorComponent {
  protected readonly appearance = inject(AppearanceService)
}