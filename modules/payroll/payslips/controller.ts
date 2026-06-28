import type { Request, Response } from "express";
import { payslipsService } from "./service";

const contextFromRequest = (request: Request) => ({
  tenantId: String(request.header("x-tenant-id") ?? request.body?.tenantId ?? request.query?.tenantId ?? "demo-tenant"),
  actorId: String(request.header("x-actor-id") ?? "system"),
  roles: String(request.header("x-roles") ?? "admin").split(","),
  permissions: String(request.header("x-permissions") ?? "*").split(","),
});

export const payslipsController = {
  async list(request: Request, response: Response) {
    response.json(await payslipsService.list({ ...request.query, tenantId: contextFromRequest(request).tenantId }));
  },
  async create(request: Request, response: Response) {
    response.status(201).json(await payslipsService.create(request.body, contextFromRequest(request)));
  },
  async update(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await payslipsService.update(context.tenantId, request.params.id, request.body, context));
  },
  async transition(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await payslipsService.transition(context.tenantId, request.params.id, request.params.action as never, context));
  },
};
