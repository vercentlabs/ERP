export const attendanceReminderJob = {
  name: "hr/attendance.reminder",
  queue: "hr-attendance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
