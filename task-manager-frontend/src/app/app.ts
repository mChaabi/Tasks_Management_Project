import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { ThemeService } from './core/services/theme';
import { LanguageService } from './core/services/language';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html'
})
export class App {
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

   ngOnInit(): void {
    this.languageService.init();
  }

  // Routes où la navbar/footer ne doivent JAMAIS apparaître
  private publicRoutes = ['/auth/login', '/auth/register'];

  showLayout = true;

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        this.showLayout = !this.publicRoutes.some(route => event.urlAfterRedirects.startsWith(route));
      });
  }
}