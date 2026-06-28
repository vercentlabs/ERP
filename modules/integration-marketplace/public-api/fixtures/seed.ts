import sample from "./sample.json";
import { publicApiService } from "../service";

export async function seedPublicApi() {
  return publicApiService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
