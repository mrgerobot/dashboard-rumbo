import rawStudents from "./students.json";
export interface Student {
  nombre: string;
  correo: string;
  campus: string;
  mentor: string;
  estado: string;
  areas: [string, string];
  interaccion: string;
  reporte: string;
}

// Cast the raw JSON import to the typed Student array.
// TypeScript will catch shape mismatches at build time.
export const students: Student[] = rawStudents as Student[];