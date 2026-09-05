package com.tasks.task_manager_BackEnd.project;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ProjectHealthAiService {

    private final ChatClient chatClient;

    public ProjectHealthScore analyzeProject(String projectTitle, ProjectHealthInput input) {
        String promptText = """
            Eres un asistente de gestión de proyectos de software. Analiza estos datos REALES
            (no inventes números, úsalos tal cual) del proyecto "%s":

            - Total de tareas: %d
            - Tareas atrasadas (fecha límite pasada, no completadas): %d
            - Tareas en progreso: %d
            - Tareas completadas: %d
            - Tareas "atascadas" (en progreso sin actividad hace 5+ días): %d

            Calcula un score de salud de 0 a 100 (100 = excelente, 0 = crítico).
            Da un riskLevel: LOW, MEDIUM o HIGH.
            Escribe un summary de 1-2 frases en español, directo y accionable para un manager.
            Lista los riesgos concretos detectados (vacío si no hay).
            """.formatted(
                projectTitle, input.totalTasks(), input.overdueTasks(),
                input.inProgressTasks(), input.completedTasks(), input.staleTasks()
        );

        try{
            return chatClient.prompt()
                    .options(OpenAiChatOptions.builder()
                            .withModel("llama-3.1-8b-instant")
                            .build())
                    .user(promptText)
                    .call()
                    .entity(ProjectHealthScore.class);

        }catch(ResourceAccessException e){
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No se pudo conectar con el servicio de IA (Groq)");
        }
    }
}