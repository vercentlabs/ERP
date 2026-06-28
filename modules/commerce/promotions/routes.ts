import type { Router } from "express";
import { promotionsController } from "./controller";
import { manifest } from "./manifest";

export function registerPromotionsRoutes(router: Router) {
  router.get(manifest.routeBase, promotionsController.list);
  router.post(manifest.routeBase, promotionsController.create);
  router.patch(`${manifest.routeBase}/:id`, promotionsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, promotionsController.transition);
}
