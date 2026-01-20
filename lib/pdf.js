import { PDFParse } from "pdf-parse";

/**
 * Extracts raw text from a PDF Buffer.
 * @param {Buffer} buffer - The file buffer of the uploaded PDF.
 * @returns {Promise<string>} - The extracted text.
 */
export async function extractTextFromPDF(buffer) {
  try {
    const data = await PDFParse(buffer);
    return data.text;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw new Error("Failed to extract text from PDF file.");
  }
}
