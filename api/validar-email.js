export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  const { email, url_origen } = req.body || {};
  if (!email) {
    return res.status(400).json({ status: "error", message: "Missing email" });
  }

  const body = new URLSearchParams({
    email: String(email).trim(),
    url_origen: String(url_origen || "vercel-dashboard"),
  }).toString();

  let r, text;
  try {
    r = await fetch("https://geroeducacion.com/validacion/validar_email.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      // optional: keep it explicit
      cache: "no-store",
    });
    text = await r.text();
  } catch {
    return res.status(502).json({ status: "error", message: "Upstream validator fetch failed" });
  }

  const ct = r.headers.get("content-type") || "";
  const snippet = (text || "").slice(0, 300);

  // ✅ Don’t trust content-type; trust parseability
  try {
    const json = JSON.parse(text);

    // Optional: enforce your expected shape
    if (!json?.status) {
      return res.status(502).json({
        status: "error",
        message: "Validator JSON missing status",
        upstream_status: r.status,
        upstream_content_type: ct,
        upstream_snippet: snippet,
      });
    }

    // Also: prevent caching at your API layer
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json(json);
  } catch {
    return res.status(502).json({
      status: "error",
      message: "Invalid response from validator (not JSON)",
      upstream_status: r.status,
      upstream_content_type: ct,
      upstream_snippet: snippet,
    });
  }
}
