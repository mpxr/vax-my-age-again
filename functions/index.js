const axios = require("axios");
const aws = require("aws-sdk");
const dynamo = new aws.DynamoDB.DocumentClient();

const nhsURL =
  "https://www.nhs.uk/conditions/coronavirus-covid-19/coronavirus-vaccination/book-coronavirus-vaccination/";

async function sendMessage(message) {
  await axios.post(
    "https://slack.com/api/chat.postMessage",
    {
      channel: process.env.SLACK_CHANNEL,
      text: message,
    },
    { headers: { Authorization: `Bearer ${process.env.SLACK_TOKEN}` } }
  );
}

async function main() {
  const result = await axios.get(nhsURL);

  const [line, age] = result.data.match(/you&#x27;re aged (\d*) [a-zA-Z0-9 ]+/);
  const [line2, ageTurn] = result.data.match(
    /you&#x27;ll turn (\d*) [a-zA-Z0-9 ]+/
  );

  const ages = await dynamo
    .scan({ TableName: process.env.TABLE_NAME })
    .promise();

  const smallest = ages.Items.sort((a, b) => a.age - b.age)[0];

  if (+smallest.age !== +age) {
    await dynamo
      .put({
        TableName: process.env.TABLE_NAME,
        Item: { age: +age, timestamp: new Date().toISOString() },
      })
      .promise();

    const message = `:syringe: Appointment Available! Book now if 1) ${line.replace(
      "&#x27;",
      "'"
    )} or 2) ${line2.replace("&#x27;", "'")}. ${nhsURL}`;
    console.log({ message });
    await sendMessage(message);
  } else {
    console.log("Not yet... ⏳", { line, line2 });
  }
}

exports.handler = main;
