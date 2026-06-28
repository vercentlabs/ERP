export const chartMasterReminderJob = {
  name: "master-data/chart-master.reminder",
  queue: "master-data-chart-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
