import { Component } from '@angular/core';
import {SearchBarComponent} from '../../../shared/components/widgets/search-bar/search-bar.component';
import {
  AppearanceSelectorComponent
} from '../../../shared/components/elements/appearance-selector/appearance-selector.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'ly-header-component',
  templateUrl: './header.component.html',
  imports: [
    RouterLink,
    SearchBarComponent,
    AppearanceSelectorComponent
  ],
  standalone: true
})

export class HeaderComponent {}
