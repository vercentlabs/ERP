import type { Router } from "express";
import { serviceContractsController } from "./controller";
import { manifest } from "./manifest";

export function registerServiceContractsRoutes(router: Router) {
  router.get(manifest.routeBase, serviceContractsController.list);
  router.post(manifest.routeBase, serviceContractsController.create);
  router.patch(`${manifest.routeBase}/:id`, serviceContractsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, serviceContractsController.transition);
}
