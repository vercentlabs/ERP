export const customPagesSyncJob = {
  name: "extension-studio/custom-pages.sync",
  queue: "extension-studio-custom-pages",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
