export const projectsInboundAdapter = {
  name: "projects/projects.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/projects",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
