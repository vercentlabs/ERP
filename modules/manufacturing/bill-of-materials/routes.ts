import type { Router } from "express";
import { billOfMaterialsController } from "./controller";
import { manifest } from "./manifest";

export function registerBillOfMaterialsRoutes(router: Router) {
  router.get(manifest.routeBase, billOfMaterialsController.list);
  router.post(manifest.routeBase, billOfMaterialsController.create);
  router.patch(`${manifest.routeBase}/:id`, billOfMaterialsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, billOfMaterialsController.transition);
}
