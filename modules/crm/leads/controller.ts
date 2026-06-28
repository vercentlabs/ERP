import type { Request, Response } from "express";
import { leadsService } from "./service";

export const contextFromRequest = (request: Request) => ({
  tenantId: String(request.header("x-tenant-id") ?? request.body?.tenantId ?? request.query?.tenantId ?? "demo-tenant"),
  companyId: request.header("x-company-id") ?? undefined,
  branchId: request.header("x-branch-id") ?? undefined,
  actorId: String(request.header("x-actor-id") ?? "system"),
  roles: String(request.header("x-roles") ?? "admin").split(","),
  permissions: String(request.header("x-permissions") ?? "*").split(","),
});

export const leadsController = {
  async list(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await leadsService.list({ ...request.query, tenantId: context.tenantId }, context));
  },

  async stats(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await leadsService.stats({ ...request.query, tenantId: context.tenantId }, context));
  },

  async getById(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await leadsService.getById(context.tenantId, request.params.id, context));
  },

  async create(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.status(201).json(await leadsService.create({ ...request.body, tenantId: context.tenantId }, context));
  },

  async update(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await leadsService.update(context.tenantId, request.params.id, request.body, context));
  },

  async softDelete(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await leadsService.softDelete(context.tenantId, request.params.id, context));
  },

  async changeStatus(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await leadsService.changeStatus(context.tenantId, request.params.id, request.body, context));
  },

  async assign(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await leadsService.assign(context.tenantId, request.params.id, request.body, context));
  },

  async convert(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await leadsService.convertLeadToCustomer(context.tenantId, request.params.id, request.body, context));
  },
};
