import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { attendanceRepository } from "./repository";
import { attendanceCreateSchema, attendanceListSchema, attendanceUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AttendanceActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const attendanceService = {
  async list(input: unknown) {
    return attendanceRepository.list(attendanceListSchema.parse(input));
  },

  async create(input: unknown, context: AttendanceActionContext) {
    const parsed = attendanceCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return attendanceRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AttendanceActionContext) {
    const current = await attendanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Attendance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return attendanceRepository.update(tenantId, id, attendanceUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AttendanceActionContext) {
    const current = await attendanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Attendance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return attendanceRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await attendanceRepository.getById(tenantId, id);
    if (!record) throw new Error("Attendance record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
