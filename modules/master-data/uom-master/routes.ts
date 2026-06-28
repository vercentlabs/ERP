import type { Router } from "express";
import { uomMasterController } from "./controller";
import { manifest } from "./manifest";

export function registerUomMasterRoutes(router: Router) {
  router.get(manifest.routeBase, uomMasterController.list);
  router.post(manifest.routeBase, uomMasterController.create);
  router.patch(`${manifest.routeBase}/:id`, uomMasterController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, uomMasterController.transition);
}
