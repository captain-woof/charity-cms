import { FormEvent, useCallback, useState } from "react"
import { FileValidationStat } from "../types/file"
import { validateFile } from "../utils/file"

export const useInputFile = (maxFileSizeInBytes: number, allowedFileTypes: string[]): [File, (e: FormEvent<HTMLInputElement>, isFileRequired?: boolean) => void, FileValidationStat] => {
    const [inputFile, setInputFile] = useState<File>(null)
    const [fileValidationStat, setFileValidationStat] = useState<FileValidationStat>("OK")

    // Function to use as "onInput" on input elements to capture file
    const onInput = useCallback((e: FormEvent<HTMLInputElement>, isFileRequired = true) => {
        // Check if file is present, if it is required
        if(isFileRequired && (!("files" in e?.target) || (e?.target["files"]?.length === 0))){
            setFileValidationStat("NO_FILE_CHOSEN")
            if (isFileRequired) return
        }

        // Check for file stats
        if ("files" in e?.target && e.target["files"].length !== 0) {
            // Validate file
            const file: File = e.target["files"][0]
            const fileValidationResult = validateFile(
                file.size,
                maxFileSizeInBytes,
                file.type,
                allowedFileTypes
            )
            setFileValidationStat(fileValidationResult)

            // Set file, only if valid
            if(fileValidationResult === "OK"){
                setInputFile(file)
            }
        }
    }, [allowedFileTypes, maxFileSizeInBytes])

    return [
        inputFile,
        onInput,
        fileValidationStat
    ]
}