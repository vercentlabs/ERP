import type { Request, Response } from "express";
import { opportunitiesService } from "./service";

export const contextFromRequest = (request: Request) => ({
  tenantId: String(request.header("x-tenant-id") ?? request.body?.tenantId ?? request.query?.tenantId ?? "demo-tenant"),
  companyId: request.header("x-company-id") ?? undefined,
  branchId: request.header("x-branch-id") ?? undefined,
  actorId: String(request.header("x-actor-id") ?? "system"),
  roles: String(request.header("x-roles") ?? "admin").split(","),
  permissions: String(request.header("x-permissions") ?? "*").split(","),
});

export const opportunitiesController = {
  async list(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await opportunitiesService.list({ ...request.query, tenantId: context.tenantId }, context));
  },
  async stats(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await opportunitiesService.stats({ ...request.query, tenantId: context.tenantId }, context));
  },
  async pipelineSummary(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await opportunitiesService.pipelineSummary({ ...request.query, tenantId: context.tenantId }, context));
  },
  async forecastSummary(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await opportunitiesService.forecastSummary({ ...request.query, tenantId: context.tenantId }, context));
  },
  async getById(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await opportunitiesService.getById(context.tenantId, request.params.id, context));
  },
  async create(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.status(201).json(await opportunitiesService.create({ ...request.body, tenantId: context.tenantId }, context));
  },
  async update(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await opportunitiesService.update(context.tenantId, request.params.id, request.body, context));
  },
  async softDelete(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await opportunitiesService.softDelete(context.tenantId, request.params.id, context));
  },
  async changeStage(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await opportunitiesService.changeStage(context.tenantId, request.params.id, request.body, context));
  },
  async assign(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await opportunitiesService.assign(context.tenantId, request.params.id, request.body, context));
  },
};
