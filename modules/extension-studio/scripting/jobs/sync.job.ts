export const scriptingSyncJob = {
  name: "extension-studio/scripting.sync",
  queue: "extension-studio-scripting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
