import google from 'googleapis'
import { authorize } from './googleClient'
import { formatExpensesToSlack } from './helpers/formatter'
import { notify } from './slack/notifier'

const loadData = () => {
  authorize(sumExpenses)
}

const sumExpenses = (auth) => {
  let developerBudgets = [];
  const sheets = google.sheets('v4')
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: process.env.SPREADSHEET_RANGE,
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err)
      return
    }
    var rows = response.values
    if (rows.length == 0) {
      console.log('No data found.')
    } else {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i]
        if (!developerBudgets[row[0]]) {
          developerBudgets[row[0]] = 0
        }
        developerBudgets[row[0]] += +row[5]
      }

      notify(formatExpensesToSlack(developerBudgets))
    }
  })
}

export { loadData }
