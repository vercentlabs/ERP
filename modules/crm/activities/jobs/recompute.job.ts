export const activitiesRecomputeJob = {
  name: "crm/activities.recompute",
  queue: "crm-activities",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
