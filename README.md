# 💉 vax-my-age-again

Get notified when you become eligible for a vaccine in the UK.

This is a simple Lambda function that fetches and parses the NHS website once an hour (scheduled by CloudWatch Events) and sends you a Telegram message if you become eligible (age can be configured in the `.env` file).

## Deploy

```
yarn
yarn build
yarn cdk deploy
```

## Configure

Rename the `.env.example` to `.env` and fill the parameters.

You need to create a Telegram Bot and set your Telegram token and chat id. More info about the Telegram bot API [here](https://github.com/yagop/node-telegram-bot-api).
