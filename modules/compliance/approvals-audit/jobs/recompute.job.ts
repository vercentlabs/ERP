export const approvalsAuditRecomputeJob = {
  name: "compliance/approvals-audit.recompute",
  queue: "compliance-approvals-audit",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
