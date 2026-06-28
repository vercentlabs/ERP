export const consentManagementReminderJob = {
  name: "compliance/consent-management.reminder",
  queue: "compliance-consent-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
