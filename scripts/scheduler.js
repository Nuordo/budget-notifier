import schedule from 'node-schedule'
import { loadData } from './sheetsClient'

export default () => {
  schedule.scheduleJob('0 8 * * 3', loadData)
}
