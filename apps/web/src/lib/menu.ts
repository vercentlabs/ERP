import { erpModules } from "./modules";

export const mainMenu = erpModules.map((module) => ({
  label: module.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
  href: `/${module}`,
}));
