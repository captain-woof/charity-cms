import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'

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
const app: FirebaseApp = initializeApp(firebaseConfig)
export default app

export const auth: Auth = getAuth(app)