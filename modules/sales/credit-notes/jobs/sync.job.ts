export const creditNotesSyncJob = {
  name: "sales/credit-notes.sync",
  queue: "sales-credit-notes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
