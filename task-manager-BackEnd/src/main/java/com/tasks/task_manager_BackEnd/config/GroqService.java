package com.tasks.task_manager_BackEnd.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class GroqService {

    private final RestClient restClient;

    public GroqService(@Value("${spring.ai.openai.api-key}") String apiKey) {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.groq.com")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String getChatCompletion(String userPrompt) {
        Map<String, Object> body = Map.of(
                "model", "llama-3.1-8b-instant",
                "messages", List.of(
                        Map.of("role", "user", "content", userPrompt)
                )
        );

        return restClient.post()
                .uri("/chat/completions")
                .body(body)
                .retrieve()
                .body(String.class);
    }
}
