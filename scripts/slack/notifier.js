import Botkit from 'botkit'

const channelRecipients = [process.env.SLACK_CHANNEL];

const notify = (message) => {
  const controller = Botkit.slackbot({})
  const bot = controller.spawn({
    token: process.env.SLACK_BOT_TOKEN
  })

  bot.configureIncomingWebhook({url: process.env.SLACK_WEBHOOK})

  for (let recipient of channelRecipients) {
    message.channel = recipient
    bot.sendWebhook(message, function(err,res) {
      console.log(err, res)
    })
  }
}

export {
  notify
}
