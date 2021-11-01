import { initializeApp, AppOptions, getApps, getApp, ServiceAccount } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'
import { credential } from 'firebase-admin'

// Firebase Admin app configs
const adminCredentialData:ServiceAccount = {
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID
}
const firebaseAdminConfig: AppOptions = {
    credential: credential.cert(adminCredentialData)
}

// Get app admin instance and export it
if (getApps().length === 0) {
    initializeApp(firebaseAdminConfig)
}

// Get auth admin and export
export const auth: Auth = getAuth(getApp())