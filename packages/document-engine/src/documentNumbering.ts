export type NumberingInput = {
  prefix: string;
  fiscalYear: string;
  sequence: number;
};

export function generateDocumentNumber(input: NumberingInput) {
  return `${input.prefix}-${input.fiscalYear}-${String(input.sequence).padStart(6, "0")}`;
}
