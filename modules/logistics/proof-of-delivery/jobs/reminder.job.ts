export const proofOfDeliveryReminderJob = {
  name: "logistics/proof-of-delivery.reminder",
  queue: "logistics-proof-of-delivery",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
