// src/app/features/users/services/user.service.ts

import { EnvironmentInjector, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { CreateUserDto, User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/api/users';

    // petit cache mémoire pour éviter de re-fetcher la liste à chaque hover
    private usersCache$?: Observable<User[]>;

    /** Liste légère de tous les utilisateurs (sans détail tasks/projects si le backend les omet). */
    getUsers(): Observable<User[]> {
        if (!this.usersCache$) {
            this.usersCache$ = this.http
                .get<User[]>(this.baseUrl)
                .pipe(shareReplay({ bufferSize: 1, refCount: false }));
        }
        return this.usersCache$;
    }

    /** Détail complet d'un utilisateur : projets + tâches assignées. */
    getUserDetail(id: number): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    createUser(userData: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.baseUrl, userData);
  }

    /** À appeler après création/édition/suppression d'un user pour invalider le cache. */
    invalidateCache(): void {
        this.usersCache$ = undefined;
    }
}
