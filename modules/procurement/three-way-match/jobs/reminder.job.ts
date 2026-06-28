export const threeWayMatchReminderJob = {
  name: "procurement/three-way-match.reminder",
  queue: "procurement-three-way-match",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
