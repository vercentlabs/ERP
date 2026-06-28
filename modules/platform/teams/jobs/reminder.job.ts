export const teamsReminderJob = {
  name: "platform/teams.reminder",
  queue: "platform-teams",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
