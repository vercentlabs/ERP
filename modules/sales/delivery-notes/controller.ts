import type { Request, Response } from "express";
import { deliveryNotesService } from "./service";

const contextFromRequest = (request: Request) => ({
  tenantId: String(request.header("x-tenant-id") ?? request.body?.tenantId ?? request.query?.tenantId ?? "demo-tenant"),
  actorId: String(request.header("x-actor-id") ?? "system"),
  roles: String(request.header("x-roles") ?? "admin").split(","),
  permissions: String(request.header("x-permissions") ?? "*").split(","),
});

export const deliveryNotesController = {
  async list(request: Request, response: Response) {
    response.json(await deliveryNotesService.list({ ...request.query, tenantId: contextFromRequest(request).tenantId }));
  },
  async create(request: Request, response: Response) {
    response.status(201).json(await deliveryNotesService.create(request.body, contextFromRequest(request)));
  },
  async update(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await deliveryNotesService.update(context.tenantId, request.params.id, request.body, context));
  },
  async transition(request: Request, response: Response) {
    const context = contextFromRequest(request);
    if (request.params.action === "post") {
      response.json(await deliveryNotesService.post(context.tenantId, request.params.id, request.body, context));
      return;
    }
    if (request.params.action === "cancel") {
      response.json(await deliveryNotesService.cancel(context.tenantId, request.params.id, context));
      return;
    }
    response.status(405).json({ error: "unsupported_delivery_note_action" });
  },
};
