export const customDashboardsReminderJob = {
  name: "extension-studio/custom-dashboards.reminder",
  queue: "extension-studio-custom-dashboards",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
