import type { Router } from "express";
import { unitsOfMeasureController } from "./controller";
import { manifest } from "./manifest";

export function registerUnitsOfMeasureRoutes(router: Router) {
  router.get(manifest.routeBase, unitsOfMeasureController.list);
  router.post(manifest.routeBase, unitsOfMeasureController.create);
  router.patch(`${manifest.routeBase}/:id`, unitsOfMeasureController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, unitsOfMeasureController.transition);
}
