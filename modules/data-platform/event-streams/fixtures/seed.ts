import sample from "./sample.json";
import { eventStreamsService } from "../service";

export async function seedEventStreams() {
  return eventStreamsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
