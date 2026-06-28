export const processManufacturingReminderJob = {
  name: "industry-packs/process-manufacturing.reminder",
  queue: "industry-packs-process-manufacturing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
