export const contactsSyncJob = {
  name: "crm/contacts.sync",
  queue: "crm-contacts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
