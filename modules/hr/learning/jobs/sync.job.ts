export const learningSyncJob = {
  name: "hr/learning.sync",
  queue: "hr-learning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
