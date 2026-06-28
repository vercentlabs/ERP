export const employeesReminderJob = {
  name: "master-data/employees.reminder",
  queue: "master-data-employees",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
