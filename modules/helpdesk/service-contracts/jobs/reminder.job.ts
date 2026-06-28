export const serviceContractsReminderJob = {
  name: "helpdesk/service-contracts.reminder",
  queue: "helpdesk-service-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
