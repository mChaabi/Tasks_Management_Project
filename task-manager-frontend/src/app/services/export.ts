import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { Project } from '../features/projects/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportToExcel(data: Project[], fileName: string = 'Proyectos'): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Proyectos': worksheet }, SheetNames: ['Proyectos'] };
    XLSX.writeFile(workbook, `${fileName}_${new Date().getTime()}.xlsx`);
  }

  exportToPdf(data: Project[], fileName: string = 'Proyectos'): void {
    const doc = new jsPDF();
    doc.text('Lista general de proyectos', 14, 15);

    const tableHeaders = [['ID', 'Título', 'Descripción', 'Estado']];
    
    // Remplacer les valeurs undefined par des chaînes de caractères ''
    const tableData: RowInput[] = data.map((proj: Project) => [
      proj.id ?? '',
      proj.title ?? '',
      proj.description ?? '',
      proj.status ?? 'PLANNED'
    ]);

    autoTable(doc, {
      head: tableHeaders,
      body: tableData,
      startY: 20,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42] }
    });

    doc.save(`${fileName}_${new Date().getTime()}.pdf`);
  }

  importFromExcel(file: File): Promise<Partial<Project>[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as Partial<Project>[];
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
}