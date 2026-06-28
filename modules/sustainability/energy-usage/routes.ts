import type { Router } from "express";
import { energyUsageController } from "./controller";
import { manifest } from "./manifest";

export function registerEnergyUsageRoutes(router: Router) {
  router.get(manifest.routeBase, energyUsageController.list);
  router.post(manifest.routeBase, energyUsageController.create);
  router.patch(`${manifest.routeBase}/:id`, energyUsageController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, energyUsageController.transition);
}
