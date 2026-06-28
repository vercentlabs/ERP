export const subcontractingReminderJob = {
  name: "manufacturing/subcontracting.reminder",
  queue: "manufacturing-subcontracting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
