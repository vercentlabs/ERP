export const dataGovernanceReminderJob = {
  name: "master-data/data-governance.reminder",
  queue: "master-data-data-governance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
