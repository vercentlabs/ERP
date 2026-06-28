export type TranslationDictionary = Record<string, Record<string, string>>;

export function translate(dictionary: TranslationDictionary, locale: string, key: string) {
  return dictionary[locale]?.[key] ?? dictionary.en?.[key] ?? key;
}
