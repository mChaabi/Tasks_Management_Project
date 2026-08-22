import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  TranslateService } from '@ngx-translate/core'; // <-- Usar TranslatePipe
import { ThemeService } from '../../../core/services/theme';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss'
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
  private translate = inject(TranslateService);

  get label(): string {
    const key = this.themeService.theme() === 'dark' ? 'COMMON.THEME_LIGHT' : 'COMMON.THEME_DARK';
    return this.translate.instant(key);
  }
}