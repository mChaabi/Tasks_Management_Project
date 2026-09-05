package com.tasks.task_manager_BackEnd.project;

public record ProjectHealthInput(
        long totalTasks, long overdueTasks, long inProgressTasks,
        long completedTasks, long staleTasks
) {}