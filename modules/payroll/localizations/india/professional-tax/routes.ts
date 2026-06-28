import type { Router } from "express";
import { localizationsIndiaProfessionalTaxController } from "./controller";
import { manifest } from "./manifest";

export function registerLocalizationsIndiaProfessionalTaxRoutes(router: Router) {
  router.get(manifest.routeBase, localizationsIndiaProfessionalTaxController.list);
  router.post(manifest.routeBase, localizationsIndiaProfessionalTaxController.create);
  router.patch(`${manifest.routeBase}/:id`, localizationsIndiaProfessionalTaxController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, localizationsIndiaProfessionalTaxController.transition);
}
