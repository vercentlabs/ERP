export const leaveReminderJob = {
  name: "hr/leave.reminder",
  queue: "hr-leave",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
