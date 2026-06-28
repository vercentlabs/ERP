import type { Router } from "express";
import { localizationsIndiaPfController } from "./controller";
import { manifest } from "./manifest";

export function registerLocalizationsIndiaPfRoutes(router: Router) {
  router.get(manifest.routeBase, localizationsIndiaPfController.list);
  router.post(manifest.routeBase, localizationsIndiaPfController.create);
  router.patch(`${manifest.routeBase}/:id`, localizationsIndiaPfController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, localizationsIndiaPfController.transition);
}
