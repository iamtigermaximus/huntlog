declare module "pdf-parse" {
  export class PDFParse {
    constructor(opts: { data: Buffer; verbosity?: number });
    getText(params?: {
      partial?: number[];
      first?: number;
      last?: number;
      parseHyperlinks?: boolean;
      lineEnforce?: boolean;
      lineThreshold?: number;
      cellSeparator?: string;
      cellThreshold?: number;
      pageJoiner?: string;
      itemJoiner?: string;
    }): Promise<{
      text: string;
      total: number;
      pages: Array<{ num: number; text: string }>;
    }>;
    destroy(): Promise<void>;
  }
}
