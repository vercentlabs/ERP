import type { Router } from "express";
import { shopFloorController } from "./controller";
import { manifest } from "./manifest";

export function registerShopFloorRoutes(router: Router) {
  router.get(manifest.routeBase, shopFloorController.list);
  router.post(manifest.routeBase, shopFloorController.create);
  router.patch(`${manifest.routeBase}/:id`, shopFloorController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, shopFloorController.transition);
}
