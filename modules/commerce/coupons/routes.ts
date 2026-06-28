import type { Router } from "express";
import { couponsController } from "./controller";
import { manifest } from "./manifest";

export function registerCouponsRoutes(router: Router) {
  router.get(manifest.routeBase, couponsController.list);
  router.post(manifest.routeBase, couponsController.create);
  router.patch(`${manifest.routeBase}/:id`, couponsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, couponsController.transition);
}
