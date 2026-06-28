export const departmentsReminderJob = {
  name: "hr/departments.reminder",
  queue: "hr-departments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
