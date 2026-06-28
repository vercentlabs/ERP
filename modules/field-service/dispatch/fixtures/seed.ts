import sample from "./sample.json";
import { dispatchService } from "../service";

export async function seedDispatch() {
  return dispatchService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
