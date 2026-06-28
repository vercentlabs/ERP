import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { professionalServicesRepository } from "./repository";
import { professionalServicesCreateSchema, professionalServicesListSchema, professionalServicesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProfessionalServicesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const professionalServicesService = {
  async list(input: unknown) {
    return professionalServicesRepository.list(professionalServicesListSchema.parse(input));
  },

  async create(input: unknown, context: ProfessionalServicesActionContext) {
    const parsed = professionalServicesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return professionalServicesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProfessionalServicesActionContext) {
    const current = await professionalServicesRepository.getById(tenantId, id);
    if (!current) throw new Error("Professional Services record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return professionalServicesRepository.update(tenantId, id, professionalServicesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProfessionalServicesActionContext) {
    const current = await professionalServicesRepository.getById(tenantId, id);
    if (!current) throw new Error("Professional Services record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return professionalServicesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await professionalServicesRepository.getById(tenantId, id);
    if (!record) throw new Error("Professional Services record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
