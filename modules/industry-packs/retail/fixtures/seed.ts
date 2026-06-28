import sample from "./sample.json";
import { retailService } from "../service";

export async function seedRetail() {
  return retailService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
