import sample from "./sample.json";
import { leaveService } from "../service";

export async function seedLeave() {
  return leaveService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
