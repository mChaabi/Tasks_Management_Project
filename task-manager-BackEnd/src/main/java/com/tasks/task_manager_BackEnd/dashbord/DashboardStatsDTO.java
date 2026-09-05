package com.tasks.task_manager_BackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardStatsDTO {
    private long totalProjects;
    private long totalTasks;
    private long totalComments;
    private long totalUsers;

    private Map<String, Long> tasksByStatus;   // ex: {"TODO": 5, "IN_PROGRESS": 3, "DONE": 8}
    private Map<String, Long> projectsByStatus; // ex: {"PLANNED": 2, "COMPLETED": 4}
}