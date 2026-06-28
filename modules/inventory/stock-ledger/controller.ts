import type { Request, Response } from "express";
import { stockLedgerService } from "./service";

const contextFromRequest = (request: Request) => ({
  tenantId: String(request.header("x-tenant-id") ?? request.body?.tenantId ?? request.query?.tenantId ?? "demo-tenant"),
  actorId: String(request.header("x-actor-id") ?? "system"),
  roles: String(request.header("x-roles") ?? "admin").split(","),
  permissions: String(request.header("x-permissions") ?? "*").split(","),
});

export const stockLedgerController = {
  async list(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.json(await stockLedgerService.listStockLedger({ ...request.query, tenantId: context.tenantId }, context));
  },
  async create(request: Request, response: Response) {
    const context = contextFromRequest(request);
    response.status(201).json(await stockLedgerService.createStockAdjustment({ ...request.body, tenantId: context.tenantId }, context));
  },
  async update(request: Request, response: Response) {
    response.status(405).json({ error: "method_not_allowed", message: "Stock ledger entries are immutable" });
  },
  async transition(request: Request, response: Response) {
    response.status(405).json({ error: "method_not_allowed", message: "Stock ledger entries do not use workflow transitions" });
  },
};
