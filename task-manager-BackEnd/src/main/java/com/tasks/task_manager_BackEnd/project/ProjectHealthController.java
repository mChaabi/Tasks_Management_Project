package com.tasks.task_manager_BackEnd.project;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects/{id}/health")
@RequiredArgsConstructor
public class ProjectHealthController {

    private final ProjectHealthDataService dataService;
    private final ProjectHealthAiService aiService;
    private final ProjectService projectService;

    @GetMapping
    public ProjectHealthScore getHealth(@PathVariable Long id) {
        Project project = projectService.getById(id);
        ProjectHealthInput input = dataService.buildInput(project.getId());

        return aiService.analyzeProject(project.getTitle(), input);
    }
}