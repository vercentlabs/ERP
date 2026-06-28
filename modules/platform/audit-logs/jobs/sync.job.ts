export const auditLogsSyncJob = {
  name: "platform/audit-logs.sync",
  queue: "platform-audit-logs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
