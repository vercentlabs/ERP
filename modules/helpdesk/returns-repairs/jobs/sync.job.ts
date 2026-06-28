export const returnsRepairsSyncJob = {
  name: "helpdesk/returns-repairs.sync",
  queue: "helpdesk-returns-repairs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
