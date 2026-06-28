export const eventStreamsOutboundAdapter = {
  name: "data-platform/event-streams.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/event-streams",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
