import type { Router } from "express";
import { taxMasterController } from "./controller";
import { manifest } from "./manifest";

export function registerTaxMasterRoutes(router: Router) {
  router.get(manifest.routeBase, taxMasterController.list);
  router.post(manifest.routeBase, taxMasterController.create);
  router.patch(`${manifest.routeBase}/:id`, taxMasterController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, taxMasterController.transition);
}
