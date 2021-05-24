# 💉 vax-my-age-again

Get notified when you become eligible for a vaccine in the UK.

This is a simple Lambda function that fetches and parses the NHS website once an hour (scheduled by CloudWatch Events) and sends you a Slack message if you become eligible.

## Deploy

```
yarn
yarn build
yarn cdk deploy
```

Rename the `.env.example` to `.env` and fill the parameters.
