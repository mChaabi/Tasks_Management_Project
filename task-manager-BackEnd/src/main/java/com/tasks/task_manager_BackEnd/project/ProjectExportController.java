package com.tasks.task_manager_BackEnd.project;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ProjectExportController {

    private final ProjectService projectService;
    private final ProjectExportService projectExportService;

    public ProjectExportController(ProjectService projectService, ProjectExportService projectExportService) {
        this.projectService = projectService;
        this.projectExportService = projectExportService;
    }

    // Endpoint Export Excel -> GET http://localhost:8080/api/projects/export/excel
    @GetMapping("/export/excel")
    public ResponseEntity<InputStreamResource> exportToExcel() throws IOException {
        // Corrigé: List<ProjectResponseDTO> au lieu de List<Project>
        List<ProjectResponseDTO> projects = projectService.getAllProjects();
        ByteArrayInputStream in = projectExportService.exportToExcel(projects);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=proyectos.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(in));
    }

    // Endpoint Export PDF -> GET http://localhost:8080/api/projects/export/pdf
    @GetMapping("/export/pdf")
    public ResponseEntity<InputStreamResource> exportToPdf() {
        // Corrigé: List<ProjectResponseDTO> au lieu de List<Project>
        List<ProjectResponseDTO> projects = projectService.getAllProjects();
        ByteArrayInputStream in = projectExportService.exportToPdf(projects);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=proyectos.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(in));
    }

    // Endpoint Import Excel -> POST http://localhost:8080/api/projects/import
    @PostMapping("/import")
    public ResponseEntity<List<Project>> importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        List<Project> importedProjects = projectExportService.importFromExcel(file);
        return ResponseEntity.ok(importedProjects);
    }
}