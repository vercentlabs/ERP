export function createRealtimeChannel(tenantId: string) {
  return {
    tenantId,
    subscribe(event: string, handler: (payload: unknown) => void) {
      return { event, unsubscribe: () => handler };
    },
  };
}
