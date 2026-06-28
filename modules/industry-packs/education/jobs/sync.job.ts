export const educationSyncJob = {
  name: "industry-packs/education.sync",
  queue: "industry-packs-education",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
