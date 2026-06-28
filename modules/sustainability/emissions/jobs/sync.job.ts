export const emissionsSyncJob = {
  name: "sustainability/emissions.sync",
  queue: "sustainability-emissions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
