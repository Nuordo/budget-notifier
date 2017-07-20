import schedule from 'node-schedule'
import { loadData } from './sheetsClient'

export default () => {
  schedule.scheduleJob('10 10 * * 4', loadData)
}
