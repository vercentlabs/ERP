import sample from "./sample.json";
import { campaignsService } from "../service";

export async function seedCampaigns() {
  return campaignsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
