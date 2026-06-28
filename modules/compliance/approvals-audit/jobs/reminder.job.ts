export const approvalsAuditReminderJob = {
  name: "compliance/approvals-audit.reminder",
  queue: "compliance-approvals-audit",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
