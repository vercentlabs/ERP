export const dispatchReminderJob = {
  name: "field-service/dispatch.reminder",
  queue: "field-service-dispatch",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
