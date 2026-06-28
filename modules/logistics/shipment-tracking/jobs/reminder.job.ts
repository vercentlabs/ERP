export const shipmentTrackingReminderJob = {
  name: "logistics/shipment-tracking.reminder",
  queue: "logistics-shipment-tracking",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
