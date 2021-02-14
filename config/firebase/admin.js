import admin from 'firebase-admin'

const serviceAccount = {
  type: 'service_account',
  project_id: 'ads-openhub',
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: JSON.parse(process.env.PRIVATE_KEY),
}

const adminApp = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app()

export const firestore = adminApp.firestore()

export const auth = adminApp.auth()

export default adminApp
