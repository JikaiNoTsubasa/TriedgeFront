import { Component, inject } from '@angular/core';
import { TriService } from '../../services/TriService';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  triService = inject(TriService);
}
