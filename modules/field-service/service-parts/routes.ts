import type { Router } from "express";
import { servicePartsController } from "./controller";
import { manifest } from "./manifest";

export function registerServicePartsRoutes(router: Router) {
  router.get(manifest.routeBase, servicePartsController.list);
  router.post(manifest.routeBase, servicePartsController.create);
  router.patch(`${manifest.routeBase}/:id`, servicePartsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, servicePartsController.transition);
}
