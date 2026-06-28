export const recruitmentSyncJob = {
  name: "hr/recruitment.sync",
  queue: "hr-recruitment",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
