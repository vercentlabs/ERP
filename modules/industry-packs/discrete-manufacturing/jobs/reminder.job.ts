export const discreteManufacturingReminderJob = {
  name: "industry-packs/discrete-manufacturing.reminder",
  queue: "industry-packs-discrete-manufacturing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
