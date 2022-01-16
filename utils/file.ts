import { FileValidationStat } from "../types/file";

// Function to validate file
export const validateFile = (fileSizeInBytes: number, maxFileSizeInBytes: number, fileType: string, allowedFileTypes: Array<string>): FileValidationStat => {
    // Validate size
    if (fileSizeInBytes > maxFileSizeInBytes) return "FILE_SIZE_EXCEEDED";
    // Validate file type
    else if(!allowedFileTypes.includes(fileType)) return "UNSUPPORTED_FILE_TYPE";
    // All ok
    else return "OK"
}