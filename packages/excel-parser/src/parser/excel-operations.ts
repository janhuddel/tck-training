import * as XLSX from "xlsx";

/**
 * Represents a cell in an Excel worksheet
 */
export interface ExcelCell {
  v: string | number;
  w?: string;
}

/**
 * Checks if the code is running in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Checks if the code is running in a Node.js environment
 */
export function isNode(): boolean {
  return (
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null
  );
}

/**
 * Opens and reads an Excel worksheet from a file or File object
 * @param fileInput - Either a file path (Node.js) or File object (Browser)
 * @param sheetName - Name of the worksheet to read
 * @returns Promise resolving to the worksheet
 * @throws Error if file cannot be read or worksheet not found
 */
export async function openWorksheet(
  fileInput: string | File,
  sheetName: string
): Promise<XLSX.WorkSheet> {
  try {
    let workbook: XLSX.WorkBook;

    if (typeof fileInput === "string") {
      if (isBrowser()) {
        throw new Error(
          "String file paths are not supported in browser environment. Please use File object instead."
        );
      }

      if (!isNode()) {
        throw new Error(
          "Unsupported environment. Expected Node.js or browser environment."
        );
      }

      // Node.js environment
      const fs = await import("fs");
      const path = await import("path");

      // Check if file exists and has correct extension
      if (!fs.existsSync(fileInput)) {
        throw new Error(`File not found: ${fileInput}`);
      }
      const fileExt = path.extname(fileInput).toLowerCase();
      if (fileExt !== ".xlsx") {
        throw new Error(
          `Invalid file format. Expected .xlsx file but got ${fileExt}`
        );
      }

      workbook = XLSX.readFile(fileInput);
    } else {
      if (!isBrowser()) {
        throw new Error(
          "File objects are only supported in browser environment. Please use file path string in Node.js."
        );
      }

      // Browser environment
      const data = await readFileAsArrayBuffer(fileInput);
      workbook = XLSX.read(new Uint8Array(data), { type: "array" });
    }

    return findWorksheet(workbook, sheetName);
  } catch (error) {
    throw new Error(`Failed to read Excel file: ${error}`);
  }
}

/**
 * Finds a worksheet in a workbook by name
 * @param workbook - The Excel workbook
 * @param sheetName - Name of the worksheet to find
 * @returns The found worksheet
 * @throws Error if no matching worksheet is found
 */
export function findWorksheet(
  workbook: XLSX.WorkBook,
  sheetName: string
): XLSX.WorkSheet {
  const sheetNames = Object.keys(workbook.Sheets);
  const matchingSheet = sheetNames.find((name) =>
    name.toLowerCase().includes(sheetName.toLowerCase())
  );

  if (!matchingSheet) {
    throw new Error(`No sheet found containing name: ${sheetName}`);
  }

  return workbook.Sheets[matchingSheet];
}

/**
 * Reads a File object as ArrayBuffer
 * @param file - The File object to read
 * @returns Promise resolving to the file contents as ArrayBuffer
 * @throws Error if file cannot be read
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  if (!isBrowser()) {
    throw new Error("FileReader is only available in browser environment");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event): void =>
      resolve(event.target?.result as ArrayBuffer);
    reader.onerror = (): void => reject(new Error("Failed to read file"));

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Gets the player name from a worksheet row
 * @param worksheet - The Excel worksheet
 * @param row - The row number to read
 * @returns The player name or null if not found
 */
export function getPlayerName(
  worksheet: XLSX.WorkSheet,
  row: number
): string | null {
  const cellAddress = XLSX.utils.encode_cell({ r: row, c: 0 });
  const cell = worksheet[cellAddress];
  return cell?.v?.toString() || null;
}

/**
 * Checks if a cell contains a valid date
 * @param cell - The Excel cell to check
 * @returns True if the cell contains a valid date string
 */
export function isValidDateCell(cell: ExcelCell): boolean {
  return cell && typeof cell.w === "string";
}

/**
 * Extracts a date from an Excel cell
 * @param cell - The Excel cell to extract the date from
 * @returns The extracted date or null if the cell does not contain a valid date
 */
export function extractDateFromCell(cell: XLSX.CellObject): Date | null {
  if (!cell || cell.t !== "n") {
    return null;
  }

  // Use XLSX's built-in date converter
  const date = XLSX.SSF.parse_date_code(cell.v);
  if (!date) {
    return null;
  }

  return new Date(
    date.y,
    date.m - 1, // JavaScript months are 0-based
    date.d,
    date.H,
    date.M,
    date.S
  );
}
