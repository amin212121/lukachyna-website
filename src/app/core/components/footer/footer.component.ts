import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslatePipe } from '../../../shared/pipes/translate.pipe'

@Component({
  selector: 'ly-footer-component',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [TranslatePipe, RouterLink],
})
export class FooterComponent {}
