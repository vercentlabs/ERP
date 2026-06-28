import type { Router } from "express";
import { suppliersController } from "./controller";
import { manifest } from "./manifest";

export function registerSuppliersRoutes(router: Router) {
  router.get(manifest.routeBase, suppliersController.list);
  router.post(manifest.routeBase, suppliersController.create);
  router.patch(`${manifest.routeBase}/:id`, suppliersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, suppliersController.transition);
}
