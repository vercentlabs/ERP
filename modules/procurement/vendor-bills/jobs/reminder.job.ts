export const vendorBillsReminderJob = {
  name: "procurement/vendor-bills.reminder",
  queue: "procurement-vendor-bills",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
