export const projectsOutboundAdapter = {
  name: "projects/projects.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/projects",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
