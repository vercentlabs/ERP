import sample from "./sample.json";
import { boardPacksService } from "../service";

export async function seedBoardPacks() {
  return boardPacksService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
