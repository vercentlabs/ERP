import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { Socket } from "node:net";
import { URL } from "node:url";
import { getControlPlaneKnex, getTenantKnex } from "@vercent/database/knex";
import { leadsService } from "../../../modules/crm/leads/service";
import { opportunitiesService } from "../../../modules/crm/opportunities/service";
import { masterDataService } from "../../../modules/master-data/foundation/service";
import { quotationsService } from "../../../modules/sales/quotations/service";
import { salesOrdersService } from "../../../modules/sales/sales-orders/service";
import { deliveryNotesService } from "../../../modules/sales/delivery-notes/service";
import { salesInvoicesService } from "../../../modules/sales/invoices/service";
import { salesCreditNotesService } from "../../../modules/sales/credit-notes/service";
import { salesDebitNotesService } from "../../../modules/sales/debit-notes/service";
import { inventoryStockService } from "../../../modules/inventory/stock-ledger/service";
import { accountingService } from "../../../modules/finance/accounting/service";
import { customerReceiptsService } from "../../../modules/finance/customer-receipts/service";
import { generalLedgerService } from "../../../modules/finance/general-ledger/service";
import { payrollRunsService } from "../../../modules/payroll/payroll-runs/service";
import { ticketsService } from "../../../modules/helpdesk/tickets/service";

const services = {
  "/api/crm/leads": leadsService,
  "/api/crm/opportunities": opportunitiesService,
  "/api/sales/quotations": quotationsService,
  "/api/sales/orders": salesOrdersService,
  "/api/sales/delivery-notes": deliveryNotesService,
  "/api/sales/invoices": salesInvoicesService,
  "/api/sales/credit-notes": salesCreditNotesService,
  "/api/sales/debit-notes": salesDebitNotesService,
  "/api/finance/general-ledger": generalLedgerService,
  "/api/payroll/payroll-runs": payrollRunsService,
  "/api/helpdesk/tickets": ticketsService,
};

export type ApiConfig = {
  port: number;
  defaultTenantId: string;
};

export const config: ApiConfig = {
  port: Number(process.env.API_PORT ?? process.env.PORT ?? 4000),
  defaultTenantId: process.env.VERCENT_TENANT_ID ?? process.env.DEFAULT_TENANT_ID ?? "demo-tenant",
};

export function health() {
  return {
    status: "ok" as const,
    service: "api",
    modules: Object.keys(services),
    checkedAt: new Date().toISOString(),
  };
}

async function checkDatabase(name: string, enabled: boolean, connect: () => ReturnType<typeof getTenantKnex>) {
  if (!enabled) return { name, configured: false, ok: false, optional: name === "control-plane" };
  try {
    await connect().raw("select 1");
    return { name, configured: true, ok: true };
  } catch (error) {
    return {
      name,
      configured: true,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function checkRedis() {
  if (!process.env.REDIS_URL) return { name: "redis", configured: false, ok: false, optional: true };
  const url = new URL(process.env.REDIS_URL);
  const port = Number(url.port || 6379);
  const host = url.hostname || "localhost";
  return new Promise<{ name: string; configured: boolean; ok: boolean; optional: boolean; error?: string }>((resolve) => {
    const socket = new Socket();
    const done = (result: { ok: boolean; error?: string }) => {
      socket.destroy();
      resolve({ name: "redis", configured: true, optional: true, ...result });
    };
    socket.setTimeout(1000);
    socket.once("connect", () => done({ ok: true }));
    socket.once("timeout", () => done({ ok: false, error: "connection timed out" }));
    socket.once("error", (error) => done({ ok: false, error: error.message }));
    socket.connect(port, host);
  });
}

function describeConnectionUrl(connectionString: string | undefined) {
  if (!connectionString) return { configured: false };
  try {
    const url = new URL(connectionString);
    return {
      configured: true,
      host: url.hostname,
      port: url.port || "5432",
      database: url.pathname.replace(/^\//, ""),
      username: decodeURIComponent(url.username),
    };
  } catch {
    return { configured: true, invalid: true };
  }
}

export async function databaseHealth() {
  const checks = await Promise.all([
    checkDatabase("tenant", true, () => getTenantKnex()),
    checkDatabase("control-plane", true, () => getControlPlaneKnex()),
    checkRedis(),
  ]);
  const requiredChecks = checks.filter((check) => !("optional" in check) || !check.optional);
  return {
    status: requiredChecks.every((check) => check.ok) ? "ok" : "degraded",
    api: "ok",
    tenantDb: checks.find((check) => check.name === "tenant")?.ok ? "ok" : "fail",
    controlPlaneDb: checks.find((check) => check.name === "control-plane")?.ok ? "ok" : "fail",
    redis: checks.find((check) => check.name === "redis")?.ok ? "ok" : "fail",
    databaseTargets: {
      tenant: describeConnectionUrl(process.env.TENANT_DATABASE_URL ?? process.env.DATABASE_URL),
      controlPlane: describeConnectionUrl(process.env.CONTROL_PLANE_DATABASE_URL),
    },
    checks,
    checkedAt: new Date().toISOString(),
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

function actorContext(request: IncomingMessage, tenantId: string) {
  return {
    tenantId,
    companyId: String(request.headers["x-company-id"] ?? "") || undefined,
    branchId: String(request.headers["x-branch-id"] ?? "") || undefined,
    actorId: String(request.headers["x-actor-id"] ?? "api-user"),
    roles: String(request.headers["x-roles"] ?? "admin").split(","),
    permissions: String(request.headers["x-permissions"] ?? "*").split(","),
  };
}

function leadListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    ownerUserId: url.searchParams.get("ownerUserId") ?? undefined,
    source: url.searchParams.get("source") ?? undefined,
    createdFrom: url.searchParams.get("createdFrom") ?? undefined,
    createdTo: url.searchParams.get("createdTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function opportunityListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    stage: url.searchParams.get("stage") ?? undefined,
    customerId: url.searchParams.get("customerId") ?? undefined,
    ownerUserId: url.searchParams.get("ownerUserId") ?? undefined,
    assignedTeamId: url.searchParams.get("assignedTeamId") ?? undefined,
    source: url.searchParams.get("source") ?? undefined,
    createdFrom: url.searchParams.get("createdFrom") ?? undefined,
    createdTo: url.searchParams.get("createdTo") ?? undefined,
    expectedCloseFrom: url.searchParams.get("expectedCloseFrom") ?? undefined,
    expectedCloseTo: url.searchParams.get("expectedCloseTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function quotationListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    customerId: url.searchParams.get("customerId") ?? undefined,
    opportunityId: url.searchParams.get("opportunityId") ?? undefined,
    ownerUserId: url.searchParams.get("ownerUserId") ?? undefined,
    quoteDateFrom: url.searchParams.get("quoteDateFrom") ?? undefined,
    quoteDateTo: url.searchParams.get("quoteDateTo") ?? undefined,
    validUntilFrom: url.searchParams.get("validUntilFrom") ?? undefined,
    validUntilTo: url.searchParams.get("validUntilTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function salesOrderListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    customerId: url.searchParams.get("customerId") ?? undefined,
    quotationId: url.searchParams.get("quotationId") ?? undefined,
    opportunityId: url.searchParams.get("opportunityId") ?? undefined,
    ownerUserId: url.searchParams.get("ownerUserId") ?? undefined,
    orderDateFrom: url.searchParams.get("orderDateFrom") ?? undefined,
    orderDateTo: url.searchParams.get("orderDateTo") ?? undefined,
    expectedDeliveryFrom: url.searchParams.get("expectedDeliveryFrom") ?? undefined,
    expectedDeliveryTo: url.searchParams.get("expectedDeliveryTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function deliveryNoteListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    customerId: url.searchParams.get("customerId") ?? undefined,
    salesOrderId: url.searchParams.get("salesOrderId") ?? undefined,
    warehouseId: url.searchParams.get("warehouseId") ?? undefined,
    deliveryDateFrom: url.searchParams.get("deliveryDateFrom") ?? undefined,
    deliveryDateTo: url.searchParams.get("deliveryDateTo") ?? undefined,
    postingDateFrom: url.searchParams.get("postingDateFrom") ?? undefined,
    postingDateTo: url.searchParams.get("postingDateTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function salesInvoiceListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    paymentStatus: url.searchParams.get("paymentStatus") ?? undefined,
    customerId: url.searchParams.get("customerId") ?? undefined,
    salesOrderId: url.searchParams.get("salesOrderId") ?? undefined,
    deliveryNoteId: url.searchParams.get("deliveryNoteId") ?? undefined,
    invoiceDateFrom: url.searchParams.get("invoiceDateFrom") ?? undefined,
    invoiceDateTo: url.searchParams.get("invoiceDateTo") ?? undefined,
    dueDateFrom: url.searchParams.get("dueDateFrom") ?? undefined,
    dueDateTo: url.searchParams.get("dueDateTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function financeAccountListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    type: url.searchParams.get("type") ?? undefined,
    isActive: url.searchParams.get("isActive") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function financeFiscalYearListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
  };
}

function financeJournalListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    fiscalYearId: url.searchParams.get("fiscalYearId") ?? undefined,
    dateFrom: url.searchParams.get("dateFrom") ?? undefined,
    dateTo: url.searchParams.get("dateTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function trialBalanceInput(url: URL, tenantId: string) {
  return {
    tenantId,
    fiscalYearId: url.searchParams.get("fiscalYearId") ?? undefined,
    dateFrom: url.searchParams.get("dateFrom") ?? undefined,
    dateTo: url.searchParams.get("dateTo") ?? undefined,
  };
}

function customerReceiptListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    customerId: url.searchParams.get("customerId") ?? undefined,
    paymentMethod: url.searchParams.get("paymentMethod") ?? undefined,
    receiptDateFrom: url.searchParams.get("receiptDateFrom") ?? undefined,
    receiptDateTo: url.searchParams.get("receiptDateTo") ?? undefined,
    postingDateFrom: url.searchParams.get("postingDateFrom") ?? undefined,
    postingDateTo: url.searchParams.get("postingDateTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function salesCreditNoteListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    customerId: url.searchParams.get("customerId") ?? undefined,
    salesInvoiceId: url.searchParams.get("salesInvoiceId") ?? undefined,
    creditNoteDateFrom: url.searchParams.get("creditNoteDateFrom") ?? undefined,
    creditNoteDateTo: url.searchParams.get("creditNoteDateTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function salesDebitNoteListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    accountingStatus: url.searchParams.get("accountingStatus") ?? undefined,
    customerId: url.searchParams.get("customerId") ?? undefined,
    salesInvoiceId: url.searchParams.get("salesInvoiceId") ?? undefined,
    debitNoteDateFrom: url.searchParams.get("debitNoteDateFrom") ?? undefined,
    debitNoteDateTo: url.searchParams.get("debitNoteDateTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function warehouseListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    type: url.searchParams.get("type") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function stockLedgerListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    itemId: url.searchParams.get("itemId") ?? undefined,
    warehouseId: url.searchParams.get("warehouseId") ?? undefined,
    binId: url.searchParams.get("binId") ?? undefined,
    movementType: url.searchParams.get("movementType") ?? undefined,
    referenceType: url.searchParams.get("referenceType") ?? undefined,
    referenceId: url.searchParams.get("referenceId") ?? undefined,
    postingDateFrom: url.searchParams.get("postingDateFrom") ?? undefined,
    postingDateTo: url.searchParams.get("postingDateTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

function stockBalanceListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    itemId: url.searchParams.get("itemId") ?? undefined,
    warehouseId: url.searchParams.get("warehouseId") ?? undefined,
    binId: url.searchParams.get("binId") ?? undefined,
  };
}

function masterDataListInput(url: URL, tenantId: string) {
  return {
    tenantId,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    type: url.searchParams.get("type") ?? undefined,
    group: url.searchParams.get("group") ?? undefined,
    createdFrom: url.searchParams.get("createdFrom") ?? undefined,
    createdTo: url.searchParams.get("createdTo") ?? undefined,
    sortBy: url.searchParams.get("sortBy") ?? undefined,
    sortDirection: url.searchParams.get("sortDirection") ?? undefined,
  };
}

async function handleLeadsRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  leadService: typeof leadsService,
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[3];
  const action = segments[4];

  if (request.method === "GET" && url.pathname === "/api/crm/leads") {
    json(response, 200, await leadService.list(leadListInput(url, tenantId), context));
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/crm/leads") {
    json(response, 201, await leadService.create({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/crm/leads/stats") {
    json(response, 200, await leadService.stats(leadListInput(url, tenantId), context));
    return true;
  }

  if (!id) return false;

  if (request.method === "GET" && !action) {
    json(response, 200, await leadService.getById(tenantId, id, context));
    return true;
  }

  if (request.method === "PATCH" && !action) {
    json(response, 200, await leadService.update(tenantId, id, await readJson(request), context));
    return true;
  }

  if (request.method === "DELETE" && !action) {
    json(response, 200, await leadService.softDelete(tenantId, id, context));
    return true;
  }

  if (request.method === "POST" && action === "status") {
    json(response, 200, await leadService.changeStatus(tenantId, id, await readJson(request), context));
    return true;
  }

  if (request.method === "POST" && action === "assign") {
    json(response, 200, await leadService.assign(tenantId, id, await readJson(request), context));
    return true;
  }

  if (request.method === "POST" && action === "convert") {
    json(response, 200, await leadService.convertLeadToCustomer(tenantId, id, await readJson(request), context));
    return true;
  }

  return false;
}

async function handleMasterDataRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof masterDataService,
  receiptsService: typeof customerReceiptsService,
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const resource = segments[2];
  const id = segments[3];
  const action = segments[4];

  if (request.method === "GET" && url.pathname === "/api/master-data/items/stats") {
    json(response, 200, await service.getItemStats(tenantId, context));
    return true;
  }

  if (resource === "parties" && id && action === "addresses") {
    if (request.method === "GET") {
      json(response, 200, await service.listAddresses(tenantId, id, context));
      return true;
    }
    if (request.method === "POST") {
      json(response, 201, await service.createAddress({ tenantId, partyId: id, ...(await readJson(request)) }, context));
      return true;
    }
  }

  if (resource === "addresses" && id) {
    if (request.method === "PATCH" && !action) {
      json(response, 200, await service.updateAddress(tenantId, id, await readJson(request), context));
      return true;
    }
    if (request.method === "DELETE" && !action) {
      json(response, 200, await service.deleteAddress(tenantId, id, context));
      return true;
    }
    if (request.method === "POST" && action === "default-billing") {
      json(response, 200, await service.setDefaultBillingAddress(tenantId, id, context));
      return true;
    }
    if (request.method === "POST" && action === "default-shipping") {
      json(response, 200, await service.setDefaultShippingAddress(tenantId, id, context));
      return true;
    }
  }

  if (resource === "customers" && id && action === "receipts" && request.method === "GET") {
    json(response, 200, await receiptsService.getByCustomer(tenantId, id, context));
    return true;
  }

  const handlers = {
    parties: {
      list: service.listParties,
      get: service.getParty,
      create: service.createParty,
      update: service.updateParty,
      delete: service.deleteParty,
    },
    customers: {
      list: service.listCustomers,
      get: service.getCustomer,
      create: service.createCustomer,
      update: service.updateCustomer,
      delete: service.deleteCustomer,
    },
    suppliers: {
      list: service.listSuppliers,
      get: service.getSupplier,
      create: service.createSupplier,
      update: service.updateSupplier,
      delete: service.deleteSupplier,
    },
    uoms: {
      list: service.listUoms,
      get: service.getUom,
      create: service.createUom,
      update: service.updateUom,
      delete: service.deleteUom,
    },
    items: {
      list: service.listItems,
      get: service.getItem,
      create: service.createItem,
      update: service.updateItem,
      delete: service.deleteItem,
    },
  } as const;

  const handler = handlers[resource as keyof typeof handlers];
  if (!handler) return false;

  if (request.method === "GET" && !id) {
    json(response, 200, await handler.list(masterDataListInput(url, tenantId), context));
    return true;
  }

  if (request.method === "POST" && !id) {
    json(response, 201, await handler.create({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }

  if (!id) return false;

  if (request.method === "GET" && !action) {
    json(response, 200, await handler.get(tenantId, id, context));
    return true;
  }

  if (request.method === "PATCH" && !action) {
    json(response, 200, await handler.update(tenantId, id, await readJson(request), context));
    return true;
  }

  if (request.method === "DELETE" && !action) {
    json(response, 200, await handler.delete(tenantId, id, context));
    return true;
  }

  return false;
}

async function handleOpportunitiesRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof opportunitiesService,
  routeBase: "/api/crm/opportunities" | "/api/sales/deals" = "/api/crm/opportunities",
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[3];
  const action = segments[4];

  if (request.method === "GET" && url.pathname === routeBase) {
    json(response, 200, await service.list(opportunityListInput(url, tenantId), context));
    return true;
  }
  if (request.method === "POST" && url.pathname === routeBase) {
    json(response, 201, await service.create({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }
  if (request.method === "GET" && url.pathname === `${routeBase}/stats`) {
    json(response, 200, await service.stats(opportunityListInput(url, tenantId), context));
    return true;
  }
  if (request.method === "GET" && url.pathname === `${routeBase}/pipeline-summary`) {
    json(response, 200, await service.pipelineSummary(opportunityListInput(url, tenantId), context));
    return true;
  }
  if (request.method === "GET" && url.pathname === `${routeBase}/forecast-summary`) {
    json(response, 200, await service.forecastSummary(opportunityListInput(url, tenantId), context));
    return true;
  }
  if (!id) return false;
  if (request.method === "GET" && !action) {
    json(response, 200, await service.getById(tenantId, id, context));
    return true;
  }
  if (request.method === "PATCH" && !action) {
    json(response, 200, await service.update(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "DELETE" && !action) {
    json(response, 200, await service.softDelete(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "stage") {
    json(response, 200, await service.changeStage(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "POST" && action === "assign") {
    json(response, 200, await service.assign(tenantId, id, await readJson(request), context));
    return true;
  }
  return false;
}

async function handleQuotationsRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof quotationsService,
  orderService: typeof salesOrdersService,
  routeBase: "/api/sales/quotations" | "/api/sales/quotes" = "/api/sales/quotations",
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[3];
  const action = segments[4];

  if (request.method === "GET" && url.pathname === routeBase) {
    json(response, 200, await service.list(quotationListInput(url, tenantId), context));
    return true;
  }
  if (request.method === "POST" && url.pathname === routeBase) {
    json(response, 201, await service.create({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }
  if (request.method === "GET" && url.pathname === `${routeBase}/stats`) {
    json(response, 200, await service.stats(quotationListInput(url, tenantId), context));
    return true;
  }
  if (!id) return false;
  if (request.method === "GET" && !action) {
    json(response, 200, await service.getById(tenantId, id, context));
    return true;
  }
  if (request.method === "PATCH" && !action) {
    json(response, 200, await service.update(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "DELETE" && !action) {
    json(response, 200, await service.softDelete(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "status") {
    json(response, 200, await service.changeStatus(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "GET" && action === "lines") {
    json(response, 200, await service.getLines(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "convert-to-order") {
    json(response, 201, await orderService.createFromQuotation(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "GET" && action === "linked-order") {
    const result = await orderService.list({ tenantId, quotationId: id, pageSize: 1 }, context);
    json(response, 200, result.rows[0] ?? null);
    return true;
  }
  return false;
}

async function handleSalesOrdersRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof salesOrdersService,
  inventoryService: typeof inventoryStockService,
  deliveryService: typeof deliveryNotesService,
  invoiceService: typeof salesInvoicesService,
  routeBase: "/api/sales/orders" | "/api/sales/sales-orders" = "/api/sales/orders",
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[3];
  const action = segments[4];

  if (request.method === "GET" && url.pathname === routeBase) {
    json(response, 200, await service.list(salesOrderListInput(url, tenantId), context));
    return true;
  }
  if (request.method === "POST" && url.pathname === routeBase) {
    json(response, 201, await service.create({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }
  if (request.method === "GET" && url.pathname === `${routeBase}/stats`) {
    json(response, 200, await service.stats(salesOrderListInput(url, tenantId), context));
    return true;
  }
  if (!id) return false;
  if (request.method === "GET" && !action) {
    json(response, 200, await service.getById(tenantId, id, context));
    return true;
  }
  if (request.method === "PATCH" && !action) {
    json(response, 200, await service.update(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "DELETE" && !action) {
    json(response, 200, await service.softDelete(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "status") {
    json(response, 200, await service.changeStatus(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "GET" && action === "stock-availability") {
    json(response, 200, await inventoryService.getSalesOrderStockAvailability(tenantId, id, context));
    return true;
  }
  if (request.method === "GET" && action === "delivery-notes") {
    json(response, 200, await deliveryService.getBySalesOrder(tenantId, id, context));
    return true;
  }
  if (request.method === "GET" && action === "delivery-summary") {
    json(response, 200, await deliveryService.getSalesOrderDeliverySummary(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "create-delivery-note") {
    json(response, 201, await deliveryService.createFromSalesOrder(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "GET" && action === "invoices") {
    json(response, 200, await invoiceService.getBySalesOrder(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "create-invoice") {
    json(response, 201, await invoiceService.createFromSalesOrder(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "GET" && action === "lines") {
    json(response, 200, await service.getLines(tenantId, id, context));
    return true;
  }
  return false;
}

async function handleDeliveryNotesRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof deliveryNotesService,
  invoiceService: typeof salesInvoicesService,
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[3];
  const action = segments[4];

  if (request.method === "GET" && url.pathname === "/api/sales/delivery-notes") {
    json(response, 200, await service.list(deliveryNoteListInput(url, tenantId), context));
    return true;
  }
  if (request.method === "POST" && url.pathname === "/api/sales/delivery-notes") {
    json(response, 201, await service.create({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }
  if (request.method === "GET" && url.pathname === "/api/sales/delivery-notes/stats") {
    json(response, 200, await service.stats(deliveryNoteListInput(url, tenantId), context));
    return true;
  }
  if (!id) return false;
  if (request.method === "GET" && !action) {
    json(response, 200, await service.getById(tenantId, id, context));
    return true;
  }
  if (request.method === "PATCH" && !action) {
    json(response, 200, await service.update(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "DELETE" && !action) {
    json(response, 200, await service.softDelete(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "post") {
    json(response, 200, await service.post(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "POST" && action === "cancel") {
    json(response, 200, await service.cancel(tenantId, id, context));
    return true;
  }
  if (request.method === "GET" && action === "lines") {
    json(response, 200, await service.getLines(tenantId, id, context));
    return true;
  }
  if (request.method === "GET" && action === "invoice") {
    json(response, 200, (await invoiceService.getByDeliveryNote(tenantId, id, context)) ?? null);
    return true;
  }
  if (request.method === "POST" && action === "create-invoice") {
    json(response, 201, await invoiceService.createFromDeliveryNote(tenantId, id, await readJson(request), context));
    return true;
  }
  return false;
}

async function handleSalesInvoicesRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof salesInvoicesService,
  receiptsService: typeof customerReceiptsService,
  creditNotesService: typeof salesCreditNotesService,
  debitNotesService: typeof salesDebitNotesService,
  routeBase: "/api/sales/invoices" | "/api/accounting/invoices" = "/api/sales/invoices",
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[3];
  const action = segments[4];
  if (request.method === "GET" && url.pathname === routeBase) {
    json(response, 200, await service.list(salesInvoiceListInput(url, tenantId), context));
    return true;
  }
  if (request.method === "POST" && url.pathname === routeBase) {
    json(response, 201, await service.create({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }
  if (request.method === "GET" && url.pathname === `${routeBase}/stats`) {
    json(response, 200, await service.stats(salesInvoiceListInput(url, tenantId), context));
    return true;
  }
  if (!id) return false;
  if (request.method === "GET" && !action) {
    json(response, 200, await service.getById(tenantId, id, context));
    return true;
  }
  if (request.method === "PATCH" && !action) {
    json(response, 200, await service.update(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "DELETE" && !action) {
    json(response, 200, await service.softDelete(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "issue") {
    json(response, 200, await service.issue(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "POST" && action === "cancel") {
    json(response, 200, await service.cancel(tenantId, id, context));
    return true;
  }
  if (request.method === "GET" && action === "lines") {
    json(response, 200, await service.getLines(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "post-accounting") {
    json(response, 200, await service.postToAccounting(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "GET" && action === "accounting") {
    json(response, 200, await service.getAccountingStatus(tenantId, id, context));
    return true;
  }
  if (request.method === "GET" && action === "journal-entry") {
    json(response, 200, await service.getJournalEntry(tenantId, id, context));
    return true;
  }
  if (request.method === "GET" && action === "receipts") {
    json(response, 200, await receiptsService.getByInvoice(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "create-receipt") {
    json(response, 201, await receiptsService.createFromInvoice(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "GET" && action === "credit-notes") {
    json(response, 200, await creditNotesService.getByInvoice(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "create-credit-note") {
    json(response, 201, await creditNotesService.createFromInvoice(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "GET" && action === "debit-notes") {
    json(response, 200, await debitNotesService.getByInvoice(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "create-debit-note") {
    json(response, 201, await debitNotesService.createFromInvoice(tenantId, id, await readJson(request), context));
    return true;
  }
  return false;
}

async function handleSalesCreditNotesRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof salesCreditNotesService,
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[3];
  const action = segments[4];
  if (request.method === "GET" && url.pathname === "/api/sales/credit-notes") {
    json(response, 200, await service.list(salesCreditNoteListInput(url, tenantId), context));
    return true;
  }
  if (request.method === "POST" && url.pathname === "/api/sales/credit-notes") {
    json(response, 201, await service.create({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }
  if (request.method === "GET" && url.pathname === "/api/sales/credit-notes/stats") {
    json(response, 200, await service.stats(salesCreditNoteListInput(url, tenantId), context));
    return true;
  }
  if (!id) return false;
  if (request.method === "GET" && !action) {
    json(response, 200, await service.getById(tenantId, id, context));
    return true;
  }
  if (request.method === "PATCH" && !action) {
    json(response, 200, await service.update(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "DELETE" && !action) {
    json(response, 200, await service.softDelete(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "post") {
    json(response, 200, await service.post(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "POST" && action === "cancel") {
    json(response, 200, await service.cancel(tenantId, id, context));
    return true;
  }
  if (request.method === "GET" && action === "lines") {
    json(response, 200, await service.getLines(tenantId, id, context));
    return true;
  }
  return false;
}

async function handleSalesDebitNotesRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof salesDebitNotesService,
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[3];
  const action = segments[4];
  if (request.method === "GET" && url.pathname === "/api/sales/debit-notes") {
    json(response, 200, await service.list(salesDebitNoteListInput(url, tenantId), context));
    return true;
  }
  if (request.method === "POST" && url.pathname === "/api/sales/debit-notes") {
    json(response, 201, await service.create({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }
  if (request.method === "GET" && url.pathname === "/api/sales/debit-notes/stats") {
    json(response, 200, await service.stats(salesDebitNoteListInput(url, tenantId), context));
    return true;
  }
  if (!id) return false;
  if (request.method === "GET" && !action) {
    json(response, 200, await service.getById(tenantId, id, context));
    return true;
  }
  if (request.method === "PATCH" && !action) {
    json(response, 200, await service.update(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "DELETE" && !action) {
    json(response, 200, await service.softDelete(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "post") {
    json(response, 200, await service.post(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "POST" && action === "cancel") {
    json(response, 200, await service.cancel(tenantId, id, context));
    return true;
  }
  if (request.method === "GET" && action === "lines") {
    json(response, 200, await service.getLines(tenantId, id, context));
    return true;
  }
  return false;
}

async function handleCustomerReceiptsRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof customerReceiptsService,
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments[3];
  const action = segments[4];
  if (request.method === "GET" && url.pathname === "/api/finance/customer-receipts") {
    json(response, 200, await service.list(customerReceiptListInput(url, tenantId), context));
    return true;
  }
  if (request.method === "POST" && url.pathname === "/api/finance/customer-receipts") {
    json(response, 201, await service.create({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }
  if (request.method === "GET" && url.pathname === "/api/finance/customer-receipts/stats") {
    json(response, 200, await service.stats(customerReceiptListInput(url, tenantId), context));
    return true;
  }
  if (!id) return false;
  if (request.method === "GET" && !action) {
    json(response, 200, await service.getById(tenantId, id, context));
    return true;
  }
  if (request.method === "PATCH" && !action) {
    json(response, 200, await service.update(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "DELETE" && !action) {
    json(response, 200, await service.softDelete(tenantId, id, context));
    return true;
  }
  if (request.method === "POST" && action === "post") {
    json(response, 200, await service.post(tenantId, id, await readJson(request), context));
    return true;
  }
  if (request.method === "POST" && action === "cancel") {
    json(response, 200, await service.cancel(tenantId, id, context));
    return true;
  }
  if (request.method === "GET" && action === "allocations") {
    json(response, 200, await service.getAllocations(tenantId, id, context));
    return true;
  }
  return false;
}

async function handleFinanceAccountingRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof accountingService,
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const resource = segments[2];
  const id = segments[3];
  const action = segments[4];

  if (resource === "accounting" && id === "settings") {
    if (request.method === "GET") {
      json(response, 200, await service.getAccountingSettings(tenantId, context, String(request.headers["x-company-id"] ?? "") || undefined, String(request.headers["x-branch-id"] ?? "") || undefined));
      return true;
    }
    if (request.method === "PATCH") {
      json(response, 200, await service.updateAccountingSettings({ tenantId, ...(await readJson(request)) }, context));
      return true;
    }
  }

  if (resource === "account-groups" && !id) {
    if (request.method === "GET") {
      json(response, 200, await service.listAccountGroups(financeAccountListInput(url, tenantId), context));
      return true;
    }
    if (request.method === "POST") {
      json(response, 201, await service.createAccountGroup({ tenantId, ...(await readJson(request)) }, context));
      return true;
    }
  }

  if (resource === "accounts") {
    if (!id && request.method === "GET") {
      json(response, 200, await service.listAccounts(financeAccountListInput(url, tenantId), context));
      return true;
    }
    if (!id && request.method === "POST") {
      json(response, 201, await service.createAccount({ tenantId, ...(await readJson(request)) }, context));
      return true;
    }
    if (id && request.method === "GET" && !action) {
      json(response, 200, await service.getAccountById(tenantId, id, context));
      return true;
    }
    if (id && request.method === "PATCH" && !action) {
      json(response, 200, await service.updateAccount(tenantId, id, await readJson(request), context));
      return true;
    }
    if (id && request.method === "DELETE" && !action) {
      json(response, 200, await service.softDeleteAccount(tenantId, id, context));
      return true;
    }
  }

  if (resource === "fiscal-years") {
    if (!id && request.method === "GET") {
      json(response, 200, await service.listFiscalYears(financeFiscalYearListInput(url, tenantId), context));
      return true;
    }
    if (!id && request.method === "POST") {
      json(response, 201, await service.createFiscalYear({ tenantId, ...(await readJson(request)) }, context));
      return true;
    }
    if (id && request.method === "POST" && action === "default") {
      json(response, 200, await service.setDefaultFiscalYear(tenantId, id, context));
      return true;
    }
    if (id && request.method === "POST" && action === "close") {
      json(response, 200, await service.closeFiscalYear(tenantId, id, context));
      return true;
    }
  }

  if (resource === "journal-entries") {
    if (!id && request.method === "GET") {
      json(response, 200, await service.listJournalEntries(financeJournalListInput(url, tenantId), context));
      return true;
    }
    if (!id && request.method === "POST") {
      json(response, 201, await service.createJournalEntry({ tenantId, ...(await readJson(request)) }, context));
      return true;
    }
    if (id && request.method === "GET" && !action) {
      json(response, 200, await service.getJournalEntryById(tenantId, id, context));
      return true;
    }
    if (id && request.method === "PATCH" && !action) {
      json(response, 200, await service.updateJournalEntry(tenantId, id, await readJson(request), context));
      return true;
    }
    if (id && request.method === "DELETE" && !action) {
      json(response, 200, await service.softDeleteJournalEntry(tenantId, id, context));
      return true;
    }
    if (id && request.method === "POST" && action === "post") {
      json(response, 200, await service.postJournalEntry(tenantId, id, context));
      return true;
    }
    if (id && request.method === "POST" && action === "cancel") {
      json(response, 200, await service.cancelJournalEntry(tenantId, id, context));
      return true;
    }
    if (id && request.method === "GET" && action === "lines") {
      json(response, 200, await service.getJournalEntryLines(tenantId, id, context));
      return true;
    }
  }

  if (resource === "reports" && id === "trial-balance" && request.method === "GET") {
    json(response, 200, await service.getTrialBalance(trialBalanceInput(url, tenantId), context));
    return true;
  }

  return false;
}

async function handleInventoryRequest(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  tenantId: string,
  service: typeof inventoryStockService,
) {
  const context = actorContext(request, tenantId);
  const segments = url.pathname.split("/").filter(Boolean);
  const resource = segments[2];
  const id = segments[3];
  const action = segments[4];

  if (resource === "warehouses" && !id) {
    if (request.method === "GET") {
      json(response, 200, await service.listWarehouses(warehouseListInput(url, tenantId), context));
      return true;
    }
    if (request.method === "POST") {
      json(response, 201, await service.createWarehouse({ tenantId, ...(await readJson(request)) }, context));
      return true;
    }
  }

  if (resource === "warehouses" && id && action === "bins") {
    if (request.method === "GET") {
      json(response, 200, await service.listWarehouseBins({ ...warehouseListInput(url, tenantId), warehouseId: id }, context));
      return true;
    }
    if (request.method === "POST") {
      json(response, 201, await service.createWarehouseBin({ tenantId, warehouseId: id, ...(await readJson(request)) }, context));
      return true;
    }
  }

  if (resource === "warehouses" && id) {
    if (request.method === "GET" && !action) {
      json(response, 200, await service.getWarehouseById(tenantId, id, context));
      return true;
    }
    if (request.method === "PATCH" && !action) {
      json(response, 200, await service.updateWarehouse(tenantId, id, await readJson(request), context));
      return true;
    }
    if (request.method === "DELETE" && !action) {
      json(response, 200, await service.softDeleteWarehouse(tenantId, id, context));
      return true;
    }
    if (request.method === "POST" && action === "default") {
      json(response, 200, await service.setDefaultWarehouse(tenantId, id, context));
      return true;
    }
  }

  if (resource === "bins" && id) {
    if (request.method === "GET" && !action) {
      json(response, 200, await service.getWarehouseBinById(tenantId, id, context));
      return true;
    }
    if (request.method === "PATCH" && !action) {
      json(response, 200, await service.updateWarehouseBin(tenantId, id, await readJson(request), context));
      return true;
    }
    if (request.method === "DELETE" && !action) {
      json(response, 200, await service.softDeleteWarehouseBin(tenantId, id, context));
      return true;
    }
    if (request.method === "POST" && action === "default") {
      json(response, 200, await service.setDefaultWarehouseBin(tenantId, id, context));
      return true;
    }
  }

  if (resource === "stock-balances" && request.method === "GET") {
    json(response, 200, await service.listStockBalances(stockBalanceListInput(url, tenantId), context));
    return true;
  }

  if (resource === "stock-ledger" && request.method === "GET") {
    json(response, 200, await service.listStockLedger(stockLedgerListInput(url, tenantId), context));
    return true;
  }

  if (resource === "items" && id && action === "availability" && request.method === "GET") {
    json(response, 200, await service.getItemStockAvailability({ tenantId, itemId: id, warehouseId: url.searchParams.get("warehouseId") ?? undefined, binId: url.searchParams.get("binId") ?? undefined }, context));
    return true;
  }

  if (resource === "items" && id && action === "ledger" && request.method === "GET") {
    json(response, 200, await service.getItemLedger({ ...stockLedgerListInput(url, tenantId), itemId: id }, context));
    return true;
  }

  if (resource === "opening-stock" && request.method === "POST") {
    json(response, 201, await service.createOpeningStock({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }

  if (resource === "stock-adjustments" && request.method === "POST") {
    json(response, 201, await service.createStockAdjustment({ tenantId, ...(await readJson(request)) }, context));
    return true;
  }

  return false;
}

export function createApiService(
  options: {
    leads?: typeof leadsService;
    masterData?: typeof masterDataService;
    opportunities?: typeof opportunitiesService;
    quotations?: typeof quotationsService;
    salesOrders?: typeof salesOrdersService;
    deliveryNotes?: typeof deliveryNotesService;
    salesInvoices?: typeof salesInvoicesService;
    salesCreditNotes?: typeof salesCreditNotesService;
    salesDebitNotes?: typeof salesDebitNotesService;
    customerReceipts?: typeof customerReceiptsService;
    inventoryStock?: typeof inventoryStockService;
    accounting?: typeof accountingService;
  } = {},
) {
  const leadService = options.leads ?? leadsService;
  const masterService = options.masterData ?? masterDataService;
  const opportunityService = options.opportunities ?? opportunitiesService;
  const quotationService = options.quotations ?? quotationsService;
  const salesOrderService = options.salesOrders ?? salesOrdersService;
  const deliveryNoteService = options.deliveryNotes ?? deliveryNotesService;
  const salesInvoiceService = options.salesInvoices ?? salesInvoicesService;
  const salesCreditNoteService = options.salesCreditNotes ?? salesCreditNotesService;
  const salesDebitNoteService = options.salesDebitNotes ?? salesDebitNotesService;
  const customerReceiptService = options.customerReceipts ?? customerReceiptsService;
  const inventoryService = options.inventoryStock ?? inventoryStockService;
  const financeAccountingService = options.accounting ?? accountingService;

  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://localhost");
      const tenantId = String(request.headers["x-tenant-id"] ?? url.searchParams.get("tenantId") ?? config.defaultTenantId);

      if (request.method === "GET" && url.pathname === "/health") {
        json(response, 200, { ...health(), database: await databaseHealth() });
        return;
      }

      if (request.method === "GET" && url.pathname === "/health/db") {
        const body = await databaseHealth();
        json(response, body.status === "ok" ? 200 : 503, body);
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/command-center") {
        json(response, 200, {
          tenantId,
          summary: "Owner command center",
          risks: ["payments-pending", "stock-risk", "approval-backlog"],
          recommendedActions: [
            "Review submitted finance documents",
            "Approve critical stock replenishment",
            "Follow up overdue customer invoices",
          ],
        });
        return;
      }

      if (url.pathname === "/api/crm/leads" || url.pathname.startsWith("/api/crm/leads/")) {
        if (await handleLeadsRequest(request, response, url, tenantId, leadService)) return;
      }

      if (url.pathname === "/api/master-data" || url.pathname.startsWith("/api/master-data/")) {
        if (await handleMasterDataRequest(request, response, url, tenantId, masterService, customerReceiptService)) return;
      }

      if (url.pathname === "/api/crm/opportunities" || url.pathname.startsWith("/api/crm/opportunities/")) {
        if (await handleOpportunitiesRequest(request, response, url, tenantId, opportunityService)) return;
      }

      if (url.pathname === "/api/sales/deals" || url.pathname.startsWith("/api/sales/deals/")) {
        if (await handleOpportunitiesRequest(request, response, url, tenantId, opportunityService, "/api/sales/deals")) return;
      }

      if (url.pathname === "/api/sales/quotations" || url.pathname.startsWith("/api/sales/quotations/")) {
        if (await handleQuotationsRequest(request, response, url, tenantId, quotationService, salesOrderService)) return;
      }

      if (url.pathname === "/api/sales/quotes" || url.pathname.startsWith("/api/sales/quotes/")) {
        if (await handleQuotationsRequest(request, response, url, tenantId, quotationService, salesOrderService, "/api/sales/quotes")) return;
      }

      if (url.pathname === "/api/sales/orders" || url.pathname.startsWith("/api/sales/orders/")) {
        if (await handleSalesOrdersRequest(request, response, url, tenantId, salesOrderService, inventoryService, deliveryNoteService, salesInvoiceService)) return;
      }

      if (url.pathname === "/api/sales/sales-orders" || url.pathname.startsWith("/api/sales/sales-orders/")) {
        if (await handleSalesOrdersRequest(request, response, url, tenantId, salesOrderService, inventoryService, deliveryNoteService, salesInvoiceService, "/api/sales/sales-orders")) return;
      }

      if (url.pathname === "/api/sales/delivery-notes" || url.pathname.startsWith("/api/sales/delivery-notes/")) {
        if (await handleDeliveryNotesRequest(request, response, url, tenantId, deliveryNoteService, salesInvoiceService)) return;
      }

      if (url.pathname === "/api/sales/invoices" || url.pathname.startsWith("/api/sales/invoices/")) {
        if (await handleSalesInvoicesRequest(request, response, url, tenantId, salesInvoiceService, customerReceiptService, salesCreditNoteService, salesDebitNoteService)) return;
      }

      if (url.pathname === "/api/accounting/invoices" || url.pathname.startsWith("/api/accounting/invoices/")) {
        if (await handleSalesInvoicesRequest(request, response, url, tenantId, salesInvoiceService, customerReceiptService, salesCreditNoteService, salesDebitNoteService, "/api/accounting/invoices")) return;
      }

      if (url.pathname === "/api/sales/credit-notes" || url.pathname.startsWith("/api/sales/credit-notes/")) {
        if (await handleSalesCreditNotesRequest(request, response, url, tenantId, salesCreditNoteService)) return;
      }

      if (url.pathname === "/api/sales/debit-notes" || url.pathname.startsWith("/api/sales/debit-notes/")) {
        if (await handleSalesDebitNotesRequest(request, response, url, tenantId, salesDebitNoteService)) return;
      }

      if (url.pathname === "/api/finance/customer-receipts" || url.pathname.startsWith("/api/finance/customer-receipts/")) {
        if (await handleCustomerReceiptsRequest(request, response, url, tenantId, customerReceiptService)) return;
      }

      if (url.pathname === "/api/finance/accounting/settings" || url.pathname === "/api/finance/account-groups" || url.pathname.startsWith("/api/finance/account-groups/") || url.pathname === "/api/finance/accounts" || url.pathname.startsWith("/api/finance/accounts/") || url.pathname === "/api/finance/fiscal-years" || url.pathname.startsWith("/api/finance/fiscal-years/") || url.pathname === "/api/finance/journal-entries" || url.pathname.startsWith("/api/finance/journal-entries/") || url.pathname === "/api/finance/reports/trial-balance") {
        if (await handleFinanceAccountingRequest(request, response, url, tenantId, financeAccountingService)) return;
      }

      if (url.pathname === "/api/inventory" || url.pathname.startsWith("/api/inventory/")) {
        if (await handleInventoryRequest(request, response, url, tenantId, inventoryService)) return;
      }

      const service = services[url.pathname as keyof typeof services];
      if (service && request.method === "GET") {
        json(response, 200, await service.list({ tenantId, search: url.searchParams.get("search") ?? undefined }));
        return;
      }

      if (service && request.method === "POST") {
        const body = await readJson(request);
        json(response, 201, await service.create({ tenantId, ...body }, actorContext(request, tenantId)));
        return;
      }

      json(response, 404, { error: "not_found", path: url.pathname });
    } catch (error) {
      json(response, 500, { error: "internal_error", message: error instanceof Error ? error.message : String(error) });
    }
  });
}

if (process.env.NODE_ENV !== "test") {
  createApiService().listen(config.port, () => {
    console.log(JSON.stringify({ service: "api", port: config.port, status: "listening" }));
  });
}
