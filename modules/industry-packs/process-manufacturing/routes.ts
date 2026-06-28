import type { Router } from "express";
import { processManufacturingController } from "./controller";
import { manifest } from "./manifest";

export function registerProcessManufacturingRoutes(router: Router) {
  router.get(manifest.routeBase, processManufacturingController.list);
  router.post(manifest.routeBase, processManufacturingController.create);
  router.patch(`${manifest.routeBase}/:id`, processManufacturingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, processManufacturingController.transition);
}
