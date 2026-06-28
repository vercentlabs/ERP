export const techniciansReminderJob = {
  name: "field-service/technicians.reminder",
  queue: "field-service-technicians",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
