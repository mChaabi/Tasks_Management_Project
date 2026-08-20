import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class LoaderComponent {
  @Input() message: string = 'Chargement en cours...';
  @Input() overlay: boolean = true;
}