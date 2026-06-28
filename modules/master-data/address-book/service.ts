import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { addressBookRepository } from "./repository";
import { addressBookCreateSchema, addressBookListSchema, addressBookUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AddressBookActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const addressBookService = {
  async list(input: unknown) {
    return addressBookRepository.list(addressBookListSchema.parse(input));
  },

  async create(input: unknown, context: AddressBookActionContext) {
    const parsed = addressBookCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return addressBookRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AddressBookActionContext) {
    const current = await addressBookRepository.getById(tenantId, id);
    if (!current) throw new Error("Address Book record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return addressBookRepository.update(tenantId, id, addressBookUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AddressBookActionContext) {
    const current = await addressBookRepository.getById(tenantId, id);
    if (!current) throw new Error("Address Book record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return addressBookRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await addressBookRepository.getById(tenantId, id);
    if (!record) throw new Error("Address Book record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
