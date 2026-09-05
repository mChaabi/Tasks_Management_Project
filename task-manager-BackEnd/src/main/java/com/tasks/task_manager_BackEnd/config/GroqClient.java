package com.tasks.task_manager_BackEnd.config;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class GroqClient {

    private static final String API_KEY = System.getenv("GROQ_API_KEY");
    private static final String GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

    public static void main(String[] args) throws Exception {
        String requestBody = """
            {
              "model": "llama-3.1-8b-instant",
              "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Explain Java Spring Boot briefly."}
              ],
              "temperature": 0.7
            }
            """;

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(GROQ_URL))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("Status Code: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
}
