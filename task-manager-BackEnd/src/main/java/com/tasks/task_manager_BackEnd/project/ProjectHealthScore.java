package com.tasks.task_manager_BackEnd.project;

import java.util.List;

public record ProjectHealthScore(
        int score,              // 0-100
        String riskLevel,       // "LOW", "MEDIUM", "HIGH"
        String summary,         // 1-2 frases explicando el score
        List<String> risks      // lista de riesgos concretos detectados
) {}