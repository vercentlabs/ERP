export const inspectionPlansSyncJob = {
  name: "quality/inspection-plans.sync",
  queue: "quality-inspection-plans",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
