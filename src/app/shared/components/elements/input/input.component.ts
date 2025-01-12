import { Component, input } from '@angular/core'

@Component({
  selector: 'ly-input',
  templateUrl: './input.component.html',
  standalone: true,
})
export class InputComponent {
  placeholder = input<string>()
}
