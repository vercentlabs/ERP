export const softwareSaasReminderJob = {
  name: "industry-packs/software-saas.reminder",
  queue: "industry-packs-software-saas",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
