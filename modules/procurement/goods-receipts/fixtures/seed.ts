import sample from "./sample.json";
import { goodsReceiptsService } from "../service";

export async function seedGoodsReceipts() {
  return goodsReceiptsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
