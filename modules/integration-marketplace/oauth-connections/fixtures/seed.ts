import sample from "./sample.json";
import { oauthConnectionsService } from "../service";

export async function seedOauthConnections() {
  return oauthConnectionsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
