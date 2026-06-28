import type { Router } from "express";
import { contractsController } from "./controller";
import { manifest } from "./manifest";

export function registerContractsRoutes(router: Router) {
  router.get(manifest.routeBase, contractsController.list);
  router.post(manifest.routeBase, contractsController.create);
  router.patch(`${manifest.routeBase}/:id`, contractsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, contractsController.transition);
}
