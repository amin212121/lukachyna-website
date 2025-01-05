import { Component } from '@angular/core';
import {InputComponent} from '../../elements/input/input.component';

@Component({
  selector: 'ly-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [
    InputComponent
  ],
  standalone: true
})

export class SearchBarComponent {}
