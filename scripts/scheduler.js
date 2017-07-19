import schedule from 'node-schedule'
import { loadData } from './sheetsClient'

export default () => {
  schedule.scheduleJob('*/2 * * * *', loadData)
}
