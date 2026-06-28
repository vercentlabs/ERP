export const riskAssessmentsReminderJob = {
  name: "risk-management/risk-assessments.reminder",
  queue: "risk-management-risk-assessments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
