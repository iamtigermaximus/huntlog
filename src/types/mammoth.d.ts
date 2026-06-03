declare module "mammoth" {
  interface MammothResult {
    value: string;
    messages: unknown[];
  }

  interface MammothOptions {
    buffer?: Buffer;
    path?: string;
    arrayBuffer?: ArrayBuffer;
  }

  export function extractRawText(options: MammothOptions): Promise<MammothResult>;
  export function convertToHtml(options: MammothOptions): Promise<MammothResult>;
  export function convertToMarkdown(options: MammothOptions): Promise<MammothResult>;
}
