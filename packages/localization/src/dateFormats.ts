export function dateFormatForLocale(locale: string) {
  return locale === "en-IN" ? "dd/MM/yyyy" : "yyyy-MM-dd";
}
