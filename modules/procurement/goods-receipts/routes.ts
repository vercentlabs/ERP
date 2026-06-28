import type { Router } from "express";
import { goodsReceiptsController } from "./controller";
import { manifest } from "./manifest";

export function registerGoodsReceiptsRoutes(router: Router) {
  router.get(manifest.routeBase, goodsReceiptsController.list);
  router.post(manifest.routeBase, goodsReceiptsController.create);
  router.patch(`${manifest.routeBase}/:id`, goodsReceiptsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, goodsReceiptsController.transition);
}
