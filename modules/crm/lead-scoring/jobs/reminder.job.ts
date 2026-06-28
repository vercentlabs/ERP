export const leadScoringReminderJob = {
  name: "crm/lead-scoring.reminder",
  queue: "crm-lead-scoring",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
