export const addressBookSyncJob = {
  name: "master-data/address-book.sync",
  queue: "master-data-address-book",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
