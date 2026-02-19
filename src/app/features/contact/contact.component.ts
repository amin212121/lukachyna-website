import { Component } from '@angular/core'
import { TranslatePipe } from '../../shared/pipes/translate.pipe'

@Component({
  selector: 'ly-contact-page',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
  imports: [TranslatePipe],
})
export class ContactComponent {}
