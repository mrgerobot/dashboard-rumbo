import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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

  // Build a stable header order from the first row
  const headers =
    rows.length > 0
      ? (Object.keys(rows[0]).filter((k) => !exclude.has(k)) as (keyof T)[])
      : [];

  const data = rows.map((row) => {
    const out: Record<string, any> = {};
    for (const h of headers) out[String(h)] = row[h];
    return out;
  });

  const ws = XLSX.utils.json_to_sheet(data, {
    header: headers.map(String),
  });

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

