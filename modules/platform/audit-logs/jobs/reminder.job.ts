export const auditLogsReminderJob = {
  name: "platform/audit-logs.reminder",
  queue: "platform-audit-logs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
