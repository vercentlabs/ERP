export const appBuilderSyncJob = {
  name: "extension-studio/app-builder.sync",
  queue: "extension-studio-app-builder",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
