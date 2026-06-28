import type { Router } from "express";
import { customer360Controller } from "./controller";
import { manifest } from "./manifest";

export function registerCustomer360Routes(router: Router) {
  router.get(manifest.routeBase, customer360Controller.list);
  router.post(manifest.routeBase, customer360Controller.create);
  router.patch(`${manifest.routeBase}/:id`, customer360Controller.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customer360Controller.transition);
}
