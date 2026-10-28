import * as pdfjsLib from 'pdfjs-dist';

// Use the bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

/**
 * Extract text content from a PDF file.
 * @param {File} file - The PDF File object
 * @returns {Promise<string>} - Extracted text
 */
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const textParts = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    if (pageText.trim()) {
      textParts.push(pageText.trim());
    }
  }

  const fullText = textParts.join('\n\n');

  if (!fullText || fullText.trim().length < 20) {
    throw new Error(
      'Could not extract text from this PDF. It might be a scanned image. Please paste your notes manually.'
    );
  }

  return fullText;
}
