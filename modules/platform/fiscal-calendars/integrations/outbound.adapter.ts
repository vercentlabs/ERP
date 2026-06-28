export const fiscalCalendarsOutboundAdapter = {
  name: "platform/fiscal-calendars.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/fiscal-calendars",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
