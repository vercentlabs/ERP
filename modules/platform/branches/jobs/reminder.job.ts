export const branchesReminderJob = {
  name: "platform/branches.reminder",
  queue: "platform-branches",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
