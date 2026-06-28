import type { Router } from "express";
import { localizationsIndiaTdsController } from "./controller";
import { manifest } from "./manifest";

export function registerLocalizationsIndiaTdsRoutes(router: Router) {
  router.get(manifest.routeBase, localizationsIndiaTdsController.list);
  router.post(manifest.routeBase, localizationsIndiaTdsController.create);
  router.patch(`${manifest.routeBase}/:id`, localizationsIndiaTdsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, localizationsIndiaTdsController.transition);
}
