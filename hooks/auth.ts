import { useEffect, useState, useCallback } from "react"
import { auth, googleAuthProvider } from '../lib/firebase'
import {
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateEmail,
    updatePassword,
    updateProfile,
    User,
} from 'firebase/auth'
import AuthErrorMessages from "../constants/auth"
import { setCookie, destroyCookie } from 'nookies'

// HELPER - Gets pretty message from exception
const getMessageFromException = (e: { code: string; message: any }): string => {
    if (Object.keys(AuthErrorMessages).includes(e.code)) {
        return AuthErrorMessages[e.code]
    } else {
        return e.message
    }
}

//////////////////
// Helper hooks
//////////////////

const useStatus = () => {
    const [error, setError] = useState<string | boolean>(false)
    const [pending, setPending] = useState<boolean>(false)
    const [success, setSuccess] = useState<string | boolean>(false)

    return { success, error, pending, setError, setPending, setSuccess }
}

//////////////////
// Hooks for auth
//////////////////

// For getting User
export const useUser = (): User => {
    // State to store user
    const [user, setUser] = useState<User | null>(null)
    // On auth state change listener
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            // Dispatch current user
            setUser(user);
            // Set user id token in his/her cookies (for later auth verification)
            (async () => {
                if (user) {
                    let uIdToken = await user.getIdToken(true)
                    setCookie(null, 'token', uIdToken, {
                        path: '/',
                        sameSite: 'strict'
                    })
                } else {
                    destroyCookie(null, 'token')
                }
            })()
        })
        return unsubscribe
    }, [])
    return user
}

// For signing in user (with email and password)
export const useSignInWithEmailAndPassword = () => {
    const { error, pending, setError, setPending, setSuccess, success } = useStatus()
    const signIn = useCallback((email: string, password: string) => {
        (async () => {
            setError(false)
            setPending(true)
            setSuccess(false)
            try {
                await signInWithEmailAndPassword(auth, email, password)
                setSuccess("Successfully signed in!")
            } catch (e) {
                setError(getMessageFromException(e))
            } finally {
                setPending(false)
            }
        })()
    }, [setError, setPending, setSuccess])

    // Return
    return { success, error, pending, signIn }
}

// For signing in user (OAuth)
export const useOAuth = () => {
    const { error, pending, setError, setPending, setSuccess, success } = useStatus()
    const signIn = useCallback((providerName: 'google') => {
        (async () => {
            setError(false)
            setPending(true)
            setSuccess(false)
            try {
                switch (providerName) {
                    case "google":
                        await signInWithRedirect(auth, googleAuthProvider)
                        break
                }
                setSuccess("Successfully signed in!")
            } catch (e) {
                setError(getMessageFromException(e))
            } finally {
                setPending(false)
            }
        })()
    }, [setError, setPending, setSuccess])

    // Return
    return { success, error, pending, signIn }
}

// For signing-up user
export const useSignUpWithEmailAndPassword = () => {
    const { error, pending, setError, setPending, setSuccess, success } = useStatus()
    const [displayName, setDisplayName] = useState<string>('')
    const user = useUser()
    const signUp = useCallback((email: string, password: string, displayName: string) => {
        (async () => {
            setDisplayName(displayName)
            setError(false)
            setPending(true)
            setSuccess(false)
            try {
                await createUserWithEmailAndPassword(auth, email, password)
            } catch (e) {
                setError(getMessageFromException(e))
            } finally {
                setPending(false)
            }
        })()
    }, [setError, setPending, setSuccess])

    useEffect(() => {
        (async () => {
            if (user) {
                await updateProfile(user, { displayName })
                setSuccess("Successfully signed up!")
            }
        })()
    }, [user, displayName, setSuccess])

    // Return
    return { success, error, pending, signUp }
}

// For signing out user
export const useSignOut = () => {
    const { error, pending, setError, setPending, setSuccess, success } = useStatus()
    const signOutUser = useCallback(() => {
        (async () => {
            setError(false)
            setPending(true)
            setSuccess(false)
            try {
                await signOut(auth)
                setSuccess("Successfully signed out!")
            } catch (e) {
                setError(getMessageFromException(e))
            } finally {
                setPending(false)
            }
        })()
    }, [setError, setPending, setSuccess])
    // Return
    return { success, error, pending, signOut: signOutUser }
}

// Send password reset email (Step 1 for password reset)
export const useSendPasswordResetEmail = () => {
    const { error, pending, setError, setPending, setSuccess, success } = useStatus()
    const sendPasswordResetEmailToUser = useCallback((email: string) => {
        (async () => {
            setError(false)
            setPending(true)
            setSuccess(false)
            try {
                await sendPasswordResetEmail(auth, email, {
                    url: `${process.env.NEXT_PUBLIC_APP_ORIGIN}/auth/login` as string
                })
                setSuccess("Check your email for instructions to reset your password.")
            } catch (e) {
                setError(getMessageFromException(e))
            } finally {
                setPending(false)
            }
        })()
    }, [setError, setPending, setSuccess])
    // Return
    return { success, error, pending, sendPasswordResetEmail: sendPasswordResetEmailToUser }
}

// Complete password reset process (Step 2 for password reset)
export const useCompletePasswordReset = () => {
    const { error, pending, setError, setPending, setSuccess, success } = useStatus()
    //(resetCode is 'oobCode' in reset url)
    const completeUserPasswordReset = useCallback((resetCode: string, newPassword: string) => {
        (async () => {
            setError(false)
            setPending(true)
            setSuccess(false)
            try {
                await confirmPasswordReset(auth, resetCode, newPassword)
                setSuccess("Password reset was successful!")
            } catch (e) {
                setError(getMessageFromException(e))
            } finally {
                setPending(false)
            }
        })()
    }, [setError, setPending, setSuccess])
    // Return
    return { success, error, pending, completePasswordReset: completeUserPasswordReset }
}

// Update user
export const useUpdateUser = () => {
    const { error, pending, setError, setPending, setSuccess, success } = useStatus()
    const user = useUser()
    const updateUser = useCallback(async (type: 'email' | 'password' | 'profilePic' | 'name', newData: string) => {
        setError(false)
        setPending(true)
        setSuccess(false)

        try {
            switch (type) {
                case 'email':
                    await updateEmail(user, newData)
                    setSuccess("Your new email has been set.")
                    break
                case 'password':
                    await updatePassword(user, newData)
                    setSuccess("Your new password has been set.")
                    break
                case 'profilePic':
                    updateProfile(user, { photoURL: newData })
                    setSuccess("Your profile picture is now updated.")
                    break
                case 'name':
                    updateProfile(user, { displayName: newData })
                    setSuccess("Your display name is now changed.")
                    break
            }
        } catch (e) {
            setError(getMessageFromException(e))
        } finally {
            setPending(false)
        }
    }, [setError, setPending, setSuccess, user])

    // Return
    return { success, error, pending, updateUser }
}