export const approvalsAuditSyncJob = {
  name: "compliance/approvals-audit.sync",
  queue: "compliance-approvals-audit",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
