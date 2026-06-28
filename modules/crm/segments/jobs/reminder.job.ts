export const segmentsReminderJob = {
  name: "crm/segments.reminder",
  queue: "crm-segments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
