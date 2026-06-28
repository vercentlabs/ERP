import type { Router } from "express";
import { foodAndBeverageController } from "./controller";
import { manifest } from "./manifest";

export function registerFoodAndBeverageRoutes(router: Router) {
  router.get(manifest.routeBase, foodAndBeverageController.list);
  router.post(manifest.routeBase, foodAndBeverageController.create);
  router.patch(`${manifest.routeBase}/:id`, foodAndBeverageController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, foodAndBeverageController.transition);
}
