export const employeesReminderJob = {
  name: "hr/employees.reminder",
  queue: "hr-employees",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
