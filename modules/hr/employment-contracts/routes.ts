import type { Router } from "express";
import { employmentContractsController } from "./controller";
import { manifest } from "./manifest";

export function registerEmploymentContractsRoutes(router: Router) {
  router.get(manifest.routeBase, employmentContractsController.list);
  router.post(manifest.routeBase, employmentContractsController.create);
  router.patch(`${manifest.routeBase}/:id`, employmentContractsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, employmentContractsController.transition);
}
