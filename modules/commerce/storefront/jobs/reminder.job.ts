export const storefrontReminderJob = {
  name: "commerce/storefront.reminder",
  queue: "commerce-storefront",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
