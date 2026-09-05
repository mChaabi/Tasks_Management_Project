import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Task } from '../tasks/models/task.model';
import { TaskService } from '../tasks/services/task';
import { Project } from '../projects/models/project.model';
import { ProjectService } from '../projects/services/project';
import { forkJoin } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

export interface CalendarItem {
  id: number;
  title: string;
  type: 'TASK' | 'PROJECT';
  date: Date;
  status?: string;
  projectId?: number; // Présent si c'est une tâche
}

interface CalendarDay {
  date: Date;
  inCurrentMonth: boolean;
  isToday: boolean;
  items: CalendarItem[];
}

const MONTH_KEYS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const WEEKDAY_KEYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,TranslatePipe],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class CalendarComponent implements OnInit {
  private taskService = inject(TaskService);
  private projectService = inject(ProjectService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  private allItems = signal<CalendarItem[]>([]);
  currentDate = signal(new Date());
  selectedDay = signal<CalendarDay | null>(null);

  // currentLang() est une Signal native : la lire ici suffit pour que
  // ces computed() se recalculent automatiquement au changement de langue.
  weekDays = computed<string[]>(() => {
    this.translate.currentLang();
    return WEEKDAY_KEYS.map(key => this.translate.instant('CALENDAR.WEEKDAYS.' + key));
  });

  monthLabel = computed(() => {
    this.translate.currentLang();
    const date = this.currentDate();
    const monthKey = MONTH_KEYS[date.getMonth()];
    const label = this.translate.instant('CALENDAR.MONTHS.' + monthKey);
    return `${label} ${date.getFullYear()}`;
  });

  calendarDays = computed<CalendarDay[]>(() => {
    const date = this.currentDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;

    const gridStart = new Date(year, month, 1 - startOffset);
    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);

      days.push({
        date: d,
        inCurrentMonth: d.getMonth() === month,
        isToday: d.toDateString() === today.toDateString(),
        items: this.getItemsForDate(d)
      });
    }
    return days;
  });

  ngOnInit(): void {
    // Charge les tâches ET les projets simultanément
    forkJoin({
      tasks: this.taskService.getAllTasksForUser(),
      projects: this.projectService.getAllProjects()
    }).subscribe({
      next: ({ tasks, projects }) => {
        const mappedTasks: CalendarItem[] = tasks
          .filter(t => t.dueDate)
          .map(t => ({
            id: t.id!,
            title: t.title,
            type: 'TASK',
            date: new Date(t.dueDate!),
            status: t.status,
            projectId: t.projectId
          }));

        const mappedProjects: CalendarItem[] = projects
          .filter(p => p.createdAt) // Ou la propriété de date souhaitée
          .map(p => ({
            id: p.id!,
            title: p.title,
            type: 'PROJECT',
            date: new Date(p.createdAt!),
            status: p.status
          }));

        this.allItems.set([...mappedTasks, ...mappedProjects]);
      },
      error: (err) => console.error('Error al cargar datos del calendario:', err)
    });
  }

  private getItemsForDate(date: Date): CalendarItem[] {
    return this.allItems().filter(item => item.date.toDateString() === date.toDateString());
  }

  prevMonth(): void {
    const d = new Date(this.currentDate());
    d.setMonth(d.getMonth() - 1);
    this.currentDate.set(d);
  }

  nextMonth(): void {
    const d = new Date(this.currentDate());
    d.setMonth(d.getMonth() + 1);
    this.currentDate.set(d);
  }

  get currentLocale(): string {
    const lang = this.translate.currentLang();
    return lang === 'fr' ? 'fr-FR'
         : lang === 'es' ? 'es-ES'
         : 'en-GB';
  }

  selectDay(day: CalendarDay): void {
    this.selectedDay.set(day.items.length > 0 ? day : null);
  }

  onItemClick(item: CalendarItem): void {
    if (item.type === 'PROJECT') {
      this.router.navigate(['/projects', item.id]);
    } else if (item.projectId) {
      this.router.navigate(['/projects', item.projectId]);
    }
  }
}