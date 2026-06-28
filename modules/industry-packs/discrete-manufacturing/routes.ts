import type { Router } from "express";
import { discreteManufacturingController } from "./controller";
import { manifest } from "./manifest";

export function registerDiscreteManufacturingRoutes(router: Router) {
  router.get(manifest.routeBase, discreteManufacturingController.list);
  router.post(manifest.routeBase, discreteManufacturingController.create);
  router.patch(`${manifest.routeBase}/:id`, discreteManufacturingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, discreteManufacturingController.transition);
}
