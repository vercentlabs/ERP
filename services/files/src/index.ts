import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

export type ServiceConfig = {
  name: string;
  port: number;
  version: string;
};

export type HealthCheck = {
  status: "ok" | "degraded";
  service: string;
  version: string;
  checkedAt: string;
  dependencies: Record<string, "ok" | "not-configured">;
};

export const config: ServiceConfig = {
  name: "files",
  port: Number(process.env.PORT ?? 4000),
  version: process.env.npm_package_version ?? "0.1.0",
};

export function health(): HealthCheck {
  return {
    status: "ok",
    service: config.name,
    version: config.version,
    checkedAt: new Date().toISOString(),
    dependencies: {
      database: process.env.DATABASE_URL ? "ok" : "not-configured",
      redis: process.env.REDIS_URL ? "ok" : "not-configured",
    },
  };
}

async function readJson(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function json(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status;
  response.setHeader("content-type", "application/json");
  response.end(JSON.stringify(body));
}

export function createFilesService() {
  return createServer(async (request, response) => {
    try {
      if (request.method === "GET" && request.url === "/health") {
        json(response, 200, health());
        return;
      }

      if (request.method === "POST" && request.url === "/events") {
        const event = await readJson(request);
        json(response, 202, {
          accepted: true,
          service: config.name,
          event,
          acceptedAt: new Date().toISOString(),
        });
        return;
      }

      json(response, 404, {
        error: "not_found",
        service: config.name,
        message: "Route is not registered on this Vercent ERP service.",
      });
    } catch (error) {
      json(response, 500, {
        error: "internal_error",
        service: config.name,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });
}

if (process.env.NODE_ENV !== "test") {
  createFilesService().listen(config.port, () => {
    console.log(JSON.stringify({ service: config.name, port: config.port, status: "listening" }));
  });
}
