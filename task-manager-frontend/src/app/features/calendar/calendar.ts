import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Task } from '../tasks/models/task.model';
import { TaskService } from '../tasks/services/task';
import { Project } from '../projects/models/project.model';
import { ProjectService } from '../projects/services/project';
import { forkJoin } from 'rxjs';

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

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class CalendarComponent implements OnInit {
  private taskService = inject(TaskService);
  private projectService = inject(ProjectService);
  private router = inject(Router);

  private allItems = signal<CalendarItem[]>([]);
  currentDate = signal(new Date());
  selectedDay = signal<CalendarDay | null>(null);

  weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  monthLabel = computed(() =>
    this.currentDate().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  );

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