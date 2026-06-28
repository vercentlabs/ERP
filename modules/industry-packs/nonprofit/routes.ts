import type { Router } from "express";
import { nonprofitController } from "./controller";
import { manifest } from "./manifest";

export function registerNonprofitRoutes(router: Router) {
  router.get(manifest.routeBase, nonprofitController.list);
  router.post(manifest.routeBase, nonprofitController.create);
  router.patch(`${manifest.routeBase}/:id`, nonprofitController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, nonprofitController.transition);
}
