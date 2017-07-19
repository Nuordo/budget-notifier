import fs from 'fs'
import readline from 'readline'
import google from 'googleapis'
import googleAuth from 'google-auth-library'

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/'
const TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json'

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (callback) => {
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const clientId = process.env.GOOGLE_CLIENT_ID
  const redirectUrl = process.env.GOOGLE_REDIRECT_URL
  const auth = new googleAuth()
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      token = process.env.GOOGLE_TOKEN
      storeToken(token)
    }

    oauth2Client.credentials = JSON.parse(token)
    callback(oauth2Client)
  })
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
const storeToken = (token) => {
  try {
    fs.mkdirSync(TOKEN_DIR)
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err
    }
  }
  fs.writeFile(TOKEN_PATH, token)
  console.log('Token stored to ' + TOKEN_PATH)
}

export { authorize }
