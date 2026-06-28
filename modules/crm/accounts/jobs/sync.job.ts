export const accountsSyncJob = {
  name: "crm/accounts.sync",
  queue: "crm-accounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
