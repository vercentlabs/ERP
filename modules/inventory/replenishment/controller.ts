import type { Request, Response } from "express";
import { replenishmentService } from "./service";

const contextFromRequest = (request: Request) => ({
  tenantId: String(request.header("x-tenant-id") ?? request.body?.tenantId ?? request.query?.tenantId ?? "demo-tenant"),
  actorId: String(request.header("x-actor-id") ?? "system"),
  roles: String(request.header("x-roles") ?? "admin").split(","),
  permissions: String(request.header("x-permissions") ?? "*").split(","),
});

export const replenishmentController = {
  async list(request: Request, response: Response) {
    response.json(await replenishmentService.list({ ...request.query, tenantId: contextFromRequest(request).tenantId }));
  },
  async create(request: Request, response: Response) {
    response.status(201).json(await replenishmentService.create(request.body, contextFromRequest(request)));
  },
  async update(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await replenishmentService.update(context.tenantId, request.params.id, request.body, context));
  },
  async transition(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await replenishmentService.transition(context.tenantId, request.params.id, request.params.action as never, context));
  },
};
