import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { PDFParse } = require("pdf-parse") as {
  PDFParse: new (opts: { data: Buffer }) => {
    getText: (params?: Record<string, unknown>) => Promise<{
      text: string;
      total: number;
      pages: Array<{ num: number; text: string }>;
    }>;
    destroy: () => Promise<void>;
  };
};
const mammoth: {
  extractRawText: (opts: {
    buffer: Buffer;
  }) => Promise<{ value: string; messages: unknown[] }>;
} = require("mammoth");

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

export class FileValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileValidationError";
  }
}

export function validateResumeFile(file: File): void {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new FileValidationError(
      "Invalid file type. Please upload a PDF or DOCX file.",
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new FileValidationError("File is too large. Maximum size is 5MB.");
  }
}

export async function extractTextFromFile(file: File): Promise<string> {
  validateResumeFile(file);
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "application/pdf") {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  }

  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new FileValidationError("Unsupported file type.");
}
