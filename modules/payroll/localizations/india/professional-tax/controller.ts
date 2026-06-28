import type { Request, Response } from "express";
import { localizationsIndiaProfessionalTaxService } from "./service";

const contextFromRequest = (request: Request) => ({
  tenantId: String(request.header("x-tenant-id") ?? request.body?.tenantId ?? request.query?.tenantId ?? "demo-tenant"),
  actorId: String(request.header("x-actor-id") ?? "system"),
  roles: String(request.header("x-roles") ?? "admin").split(","),
  permissions: String(request.header("x-permissions") ?? "*").split(","),
});

export const localizationsIndiaProfessionalTaxController = {
  async list(request: Request, response: Response) {
    response.json(await localizationsIndiaProfessionalTaxService.list({ ...request.query, tenantId: contextFromRequest(request).tenantId }));
  },
  async create(request: Request, response: Response) {
    response.status(201).json(await localizationsIndiaProfessionalTaxService.create(request.body, contextFromRequest(request)));
  },
  async update(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await localizationsIndiaProfessionalTaxService.update(context.tenantId, request.params.id, request.body, context));
  },
  async transition(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await localizationsIndiaProfessionalTaxService.transition(context.tenantId, request.params.id, request.params.action as never, context));
  },
};
