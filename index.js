const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");

const myAge = process.env.MY_AGE;
const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.CHAT_ID;
const nhsURL =
  "https://www.nhs.uk/conditions/coronavirus-covid-19/coronavirus-vaccination/book-coronavirus-vaccination/";

const bot = new TelegramBot(token, { polling: true });

async function sendMessage(message, options = {}) {
  bot.sendMessage(chatId, message, options);
}

async function main() {
  const result = await axios.get(nhsURL);

  const [line, age] = result.data.match(/you&#x27;re aged (\d*) [a-zA-Z0-9 ]+/);
  const [line2, ageTurn] = result.data.match(
    /you&#x27;ll turn (\d*) [a-zA-Z0-9 ]+/
  );

  const message = `💉  Appointment Available! Book now if 1) ${line.replace(
    "&#x27;",
    "'"
  )} or 2) ${line2.replace("&#x27;", "'")}. ${nhsURL}`;

  if (+age <= myAge) {
    console.log(message);
    await sendMessage(message);
  } else if (+ageTurn <= myAge) {
    console.log(message);
    await sendMessage(message);
  } else {
    console.log("Not yet... ⏳", { line, line2 });
  }
}

main();
