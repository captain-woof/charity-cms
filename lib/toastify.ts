import { toast } from 'react-toastify'

// Toast types
type ToastTypes = "info" | "success" | "warn" | "error"

// Function to show toast messages
export const showToast = (message: string, type: ToastTypes) => {
    toast[type](message, {
        toastId: `toast-${type}`
    })
}

// Function to show loading and then success/error toasts
export const showCompleteToast = (promiseToResolve: Promise<any>, messages: {
    pending: string
    success: string
    error: string
}) => {
    return toast.promise(promiseToResolve, messages)
}