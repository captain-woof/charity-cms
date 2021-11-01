import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth'

// Firebase app configs
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Export app instance
if (getApps().length === 0) {
    initializeApp(firebaseConfig)
}

export const auth: Auth = getAuth(getApp())

// For Google OAuth
const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider()
const scopes: string[] = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
]
scopes.forEach((scope) => {
    googleAuthProvider.addScope(scope)
});
export { googleAuthProvider }
