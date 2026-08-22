import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLang, LanguageService } from '../../../core/services/language';
import { TranslatePipe } from '@ngx-translate/core';

interface LangOption {
  code: AppLang;
  flag: string;
  label: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss'
})
export class LanguageSwitcherComponent {
  languageService = inject(LanguageService);
  open = false;

  readonly options: LangOption[] = [
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
    { code: 'en', flag: '🇬🇧', label: 'English' }
  ];

  get current(): LangOption {
    return this.options.find((o) => o.code === this.languageService.current())!;
  }

  toggle(): void {
    this.open = !this.open;
  }

  select(lang: AppLang): void {
    this.languageService.use(lang);
    this.open = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.lang-switch')) {
      this.open = false;
    }
  }
}