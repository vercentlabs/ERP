export const semanticLayerReminderJob = {
  name: "data-platform/semantic-layer.reminder",
  queue: "data-platform-semantic-layer",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
