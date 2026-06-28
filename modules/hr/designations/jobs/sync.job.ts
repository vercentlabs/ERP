export const designationsSyncJob = {
  name: "hr/designations.sync",
  queue: "hr-designations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
