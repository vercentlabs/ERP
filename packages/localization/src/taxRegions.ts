export type TaxRegion = {
  countryCode: string;
  name: string;
  indirectTaxName: string;
};

export const taxRegions: TaxRegion[] = [
  { countryCode: "IN", name: "India", indirectTaxName: "GST" },
  { countryCode: "US", name: "United States", indirectTaxName: "Sales Tax" },
];
