export async function registerPushNotifications(userId: string) {
  return {
    userId,
    token: `push_${userId}`,
    registeredAt: new Date().toISOString(),
  };
}
