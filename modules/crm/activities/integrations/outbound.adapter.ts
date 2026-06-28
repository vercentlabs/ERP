export const activitiesOutboundAdapter = {
  name: "crm/activities.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/activities",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
