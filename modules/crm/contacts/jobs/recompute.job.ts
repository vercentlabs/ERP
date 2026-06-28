export const contactsRecomputeJob = {
  name: "crm/contacts.recompute",
  queue: "crm-contacts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
