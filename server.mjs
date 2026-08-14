import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = new URL(".", import.meta.url).pathname;
const port = Number(process.env.PORT || 4173);
const types = { ".css": "text/css", ".html": "text/html", ".js": "text/javascript", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2" };

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = normalize(join(root, pathname));
    if (!file.startsWith(root)) throw new Error("Invalid path");
    const info = await stat(file).catch(() => null);
    if (info?.isDirectory() || !extname(file)) file = join(file, "index.html");
    const body = await readFile(file);
    response.writeHead(200, { "content-type": `${types[extname(file)] || "application/octet-stream"}; charset=utf-8` });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/plain" });
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Bitzsznn preview: http://127.0.0.1:${port}`));
