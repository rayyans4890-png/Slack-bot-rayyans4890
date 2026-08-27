require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/rayyans-slackbot-ping", async ({ ack, respond }) => {
  console.log("PING received");

  await ack();
  console.log("PING acknowledged");

  const start = Date.now();
  const latency = Date.now() - start;

  await respond({
    text: `Pong!\nLatency: ${latency}ms`
  });
});

app.command("/rayyans-slackbot-help", async ({ ack, respond }) => {
  console.log("HELP received");

  await ack();
  console.log("HELP acknowledged");

  await respond({
    text:
`Available Commands:
/rayyans-slackbot-ping - Check bot latency
/rayyans-slackbot-catfact - Get a cat fact
/rayyans-slackbot-joke - Get a random joke`
  });
});

app.command("/rayyans-slackbot-catfact", async ({ ack, respond }) => {
  console.log("CATFACT received");

  await ack();
  console.log("CATFACT acknowledged");

  try {
    const response = await axios.get(
      "https://catfact.ninja/fact",
      { timeout: 5000 }
    );

    await respond({
      text: `🐱 Cat Fact:\n${response.data.fact}`
    });

    console.log("CATFACT response sent");
  } catch (err) {
    console.error("Cat fact error:", err.message);

    await respond({
      text: "Failed to fetch a cat fact."
    });
  }
});

app.command("/rayyans-slackbot-joke", async ({ ack, respond }) => {
  console.log("JOKE received");

  await ack();
  console.log("JOKE acknowledged");

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
      { timeout: 5000 }
    );

    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });

    console.log("JOKE response sent");
  } catch (err) {
    console.error("Joke error:", err.message);

    await respond({
      text: "Failed to fetch a joke."
    });
  }
});

(async () => {
  await app.start();
  console.log("🤖 Rayyans-Slackbot is running!");
})();