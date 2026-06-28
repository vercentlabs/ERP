export const auditLogsRecomputeJob = {
  name: "platform/audit-logs.recompute",
  queue: "platform-audit-logs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
