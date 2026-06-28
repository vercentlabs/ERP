import sample from "./sample.json";
import { commentsService } from "../service";

export async function seedComments() {
  return commentsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
