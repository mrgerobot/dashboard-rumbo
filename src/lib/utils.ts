import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const colAliases: Record<string, string> = {
  nombre: "Nombre",
  correo: "Correo",
  campus: "Campus",
  mentor: "Mentor",
  estado: "Estado",
  interaccion: "Interacción",
  reporte: "Reporte",
  areas1: "Área recomendada 1",
  areas2: "Área recomendada 2",
};

export function exportAllColumnsToExcel<T extends Record<string, any>>(
  rows: T[],
  filename: string,
  options?: {
    excludeKeys?: (keyof T)[];
    sheetName?: string;
  }
) {
  const exclude = new Set<string>((options?.excludeKeys ?? []).map(String));
  const sheetName = options?.sheetName ?? "Datos";

  const headers =
    rows.length > 0
      ? (Object.keys(rows[0]).filter((k) => !exclude.has(k)) as (keyof T)[])
      : [];

  const expandedHeaders = rows.length > 0
    ? headers.flatMap((h) => {
        const val = rows[0][h];
        return Array.isArray(val)
          ? val.map((_, i) => `${String(h)}${i + 1}`)
          : [String(h)];
      })
    : [];

  const data = rows.map((row) => {
    const out: Record<string, any> = {};
    for (const h of headers) {
      const val = row[h];
      if (Array.isArray(val)) {
        val.forEach((v, i) => { out[`${String(h)}${i + 1}`] = v; });
      } else {
        out[String(h)] = val;
      }
    }
    return out;
  });

  const ws = XLSX.utils.json_to_sheet(data, { header: expandedHeaders });
  XLSX.utils.sheet_add_aoa(ws, [expandedHeaders.map((h) => colAliases[h] ?? h)], { origin: "A1" });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(
    new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`
  );
}