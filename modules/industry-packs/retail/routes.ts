import type { Router } from "express";
import { retailController } from "./controller";
import { manifest } from "./manifest";

export function registerRetailRoutes(router: Router) {
  router.get(manifest.routeBase, retailController.list);
  router.post(manifest.routeBase, retailController.create);
  router.patch(`${manifest.routeBase}/:id`, retailController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, retailController.transition);
}
