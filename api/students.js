import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req, res) {
  try {
    // Reads from /data/students.json, bundled with the deployment.
    // This file is NOT in public/ so it is never directly accessible by browsers.
    const filePath = join(process.cwd(), "data", "students.json");
    const raw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=86400");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}