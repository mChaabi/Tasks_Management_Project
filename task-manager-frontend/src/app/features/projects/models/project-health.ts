// features/projects/models/project-health.model.ts
export interface ProjectHealthScore {
  score: number;              // 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  summary: string;
  risks: string[];
}