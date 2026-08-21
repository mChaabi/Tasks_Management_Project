package com.tasks.task_manager_BackEnd.project;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.tasks.task_manager_BackEnd.user.User;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Cell;
import com.lowagie.text.Font;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectExportService {

    private final ProjectRepository projectRepository;

    public ProjectExportService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // --- 1. EXPORT EXCEL (Accepte List<ProjectResponseDTO>) ---
    public ByteArrayInputStream exportToExcel(List<ProjectResponseDTO> projects) throws IOException {
        String[] columns = {"ID", "Título", "Descripción"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Proyectos");

            // En-tête
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < columns.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(columns[col]);
            }

            // Données
            int rowIdx = 1;
            for (ProjectResponseDTO project : projects) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(project.id() != null ? project.id() : 0);
                row.createCell(1).setCellValue(project.title() != null ? project.title() : "");
                row.createCell(2).setCellValue(project.description() != null ? project.description() : "");
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    // --- 2. EXPORT PDF (Accepte List<ProjectResponseDTO>) ---
    public ByteArrayInputStream exportToPdf(List<ProjectResponseDTO> projects) {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
            Paragraph title = new Paragraph("Lista General de Proyectos", font);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.addCell("ID");
            table.addCell("Título");
            table.addCell("Descripción");

            for (ProjectResponseDTO project : projects) {
                table.addCell(String.valueOf(project.id()));
                table.addCell(project.title() != null ? project.title() : "");
                table.addCell(project.description() != null ? project.description() : "");
            }

            document.add(table);
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    // --- 3. IMPORT EXCEL ---
    public List<Project> importFromExcel(MultipartFile file) throws IOException {
        List<Project> projects = new ArrayList<>();
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            Project project = new Project();
            project.setTitle(row.getCell(1) != null ? row.getCell(1).getStringCellValue() : "");
            project.setDescription(row.getCell(2) != null ? row.getCell(2).getStringCellValue() : "");

            User owner = new User();
            owner.setId(1L);
            project.setOwner(owner);

            projects.add(projectRepository.save(project));
        }
        workbook.close();
        return projects;
    }
}