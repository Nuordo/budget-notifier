import schedule from 'node-schedule'
import { loadData } from './sheetsClient'

export default () => {
  schedule.scheduleJob('0 20 * * 3', loadData)
}
