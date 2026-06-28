export const professionalServicesReminderJob = {
  name: "industry-packs/professional-services.reminder",
  queue: "industry-packs-professional-services",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
