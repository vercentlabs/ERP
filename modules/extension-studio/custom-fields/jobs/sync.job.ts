export const customFieldsSyncJob = {
  name: "extension-studio/custom-fields.sync",
  queue: "extension-studio-custom-fields",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
