export const uomMasterReminderJob = {
  name: "master-data/uom-master.reminder",
  queue: "master-data-uom-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
