import sample from "./sample.json";
import { notificationsService } from "../service";

export async function seedNotifications() {
  return notificationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
