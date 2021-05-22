# 💉 vax-my-age-again

Get notified if you're eligible for a vaccine in the UK. This is a simple Lambda function that fetches and parses the NHS website once an hour (CloudWatch Events) and sends you a Telegram message if you become eligible by age (the age can be configured in the `.env` file).

## Deploy

```
yarn
yarn build
yarn cdk deploy
```

## Configure

Rename the `.env.example` to `.env` and fill the parameters.

You need to create a Telegram Bot and add your Telegram token and a chat id. More info about the Telegram bot API [here](https://github.com/yagop/node-telegram-bot-api).
