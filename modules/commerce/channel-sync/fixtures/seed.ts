import sample from "./sample.json";
import { channelSyncService } from "../service";

export async function seedChannelSync() {
  return channelSyncService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
