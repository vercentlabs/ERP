import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { payslipsRepository } from "./repository";
import { payslipsCreateSchema, payslipsListSchema, payslipsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PayslipsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const payslipsService = {
  async list(input: unknown) {
    return payslipsRepository.list(payslipsListSchema.parse(input));
  },

  async create(input: unknown, context: PayslipsActionContext) {
    const parsed = payslipsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return payslipsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PayslipsActionContext) {
    const current = await payslipsRepository.getById(tenantId, id);
    if (!current) throw new Error("Payslips record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return payslipsRepository.update(tenantId, id, payslipsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PayslipsActionContext) {
    const current = await payslipsRepository.getById(tenantId, id);
    if (!current) throw new Error("Payslips record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return payslipsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await payslipsRepository.getById(tenantId, id);
    if (!record) throw new Error("Payslips record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
