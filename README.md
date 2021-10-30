# README

## Setting up development environment 🚀

1. Clone the repository
2. Go to cloned repo directory
3. Run `yarn` to install all dependencies. *(To install yarn, use `npm i --global yarn`)*
4. Add the following environment variables in `.env.local` (create this file) **(SENSITIVE - DO NOT LEAK)**:
  ```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCujjBuVOsVmB4GlJJqJ-ConHWxerRvWKg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=charity-cms.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=charity-cms
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=charity-cms.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=776039657210
NEXT_PUBLIC_FIREBASE_APP_ID=1:776039657210:web:de419e6be6268106b7234

# Charity CMS
NEXT_PUBLIC_APP_ORIGIN=http://localhost:3000
  ```
5. Run `yarn dev` to start up the dev server on `localhost:3000`

## Deployed domains 👨‍💻

- **Production** *(branch: main)*: [https://charity-cms.vercel.app/](https://charity-cms.vercel.app/)
