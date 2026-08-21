// features/calendar/calendar.component.ts
import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Task } from '../tasks/models/task.model';
import { TaskService } from '../tasks/services/task';

interface CalendarDay {
  date: Date;
  inCurrentMonth: boolean;
  isToday: boolean;
  tasks: Task[];
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
  private router = inject(Router);

  private allTasks = signal<Task[]>([]);
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
    // Lundi = 0 ... Dimanche = 6
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
        tasks: this.getTasksForDate(d)
      });
    }
    return days;
  });

  ngOnInit(): void {
    this.taskService.getAllTasksForUser().subscribe({
      next: (tasks) => this.allTasks.set(tasks),
      error: (err) => console.error('Error al cargar tareas del calendario:', err)
    });
  }

  private getTasksForDate(date: Date): Task[] {
    return this.allTasks().filter(t => {
      if (!t.dueDate) return false;
      const due = new Date(t.dueDate);
      return due.toDateString() === date.toDateString();
    });
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
    this.selectedDay.set(day.tasks.length > 0 ? day : null);
  }

  goToProject(projectId: number): void {
    this.router.navigate(['/projects', projectId]);
  }

  isUrgent(task: Task): boolean {
    if (!task.dueDate || task.status === 'COMPLETED') return false;
    const diffHours = (new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60);
    return diffHours <= 48;
  }
}