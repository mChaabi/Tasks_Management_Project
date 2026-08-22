import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    this.theme.set(this.resolveInitialTheme());
  }

  private resolveInitialTheme(): 'light' | 'dark' {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('tm-theme') as 'light' | 'dark';
      if (savedTheme) return savedTheme;
      
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  // <--- Méthode toggle à ajouter
  toggle(): void {
    const nextTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
  }

  setTheme(newTheme: 'light' | 'dark'): void {
    this.theme.set(newTheme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('tm-theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }
}