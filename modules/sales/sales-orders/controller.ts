import type { Request, Response } from "express";
import { salesOrdersService } from "./service";

const contextFromRequest = (request: Request) => ({
  tenantId: String(request.header("x-tenant-id") ?? request.body?.tenantId ?? request.query?.tenantId ?? "demo-tenant"),
  companyId: String(request.header("x-company-id") ?? "") || undefined,
  branchId: String(request.header("x-branch-id") ?? "") || undefined,
  actorId: String(request.header("x-actor-id") ?? "system"),
  roles: String(request.header("x-roles") ?? "admin").split(","),
  permissions: String(request.header("x-permissions") ?? "*").split(","),
});

export const salesOrdersController = {
  async list(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await salesOrdersService.list({ ...request.query, tenantId: context.tenantId }, context));
  },
  async stats(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await salesOrdersService.stats({ ...request.query, tenantId: context.tenantId }, context));
  },
  async getById(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await salesOrdersService.getById(context.tenantId, request.params.id, context));
  },
  async create(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.status(201).json(await salesOrdersService.create({ tenantId: context.tenantId, ...request.body }, context));
  },
  async update(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await salesOrdersService.update(context.tenantId, request.params.id, request.body, context));
  },
  async softDelete(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await salesOrdersService.softDelete(context.tenantId, request.params.id, context));
  },
  async changeStatus(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await salesOrdersService.changeStatus(context.tenantId, request.params.id, request.body, context));
  },
  async getLines(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await salesOrdersService.getLines(context.tenantId, request.params.id, context));
  },
};
