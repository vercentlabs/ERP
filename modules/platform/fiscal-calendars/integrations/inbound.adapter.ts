export const fiscalCalendarsInboundAdapter = {
  name: "platform/fiscal-calendars.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/fiscal-calendars",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
