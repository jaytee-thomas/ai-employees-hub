const DEFAULT_PORT = 4000;

export const PORT = Number(process.env.PORT) || DEFAULT_PORT;

const DEFAULT_API_BASE = `http://localhost:${PORT}`;
export const API_BASE = process.env.API_BASE || DEFAULT_API_BASE;

const fromEnv = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultOrigins = [
  `http://localhost:${PORT}`,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

export const ALLOWED_ORIGINS = fromEnv.length ? fromEnv : defaultOrigins;
