const express = require("express");
const router = express.Router();

const { investing } = require("investing-com-api");

async function main() {
  try {
    const response1 = await investing("currencies/eur-usd");
    // const response2 = await investing("currencies/eur-usd", 3600, 24, "1-day"); // With optional params
    // const response3 = await investing("currencies/eur-usd", 1800, 24, "1-hour"); // With optional params
    // const response4 = await investing(
    //   "currencies/eur-usd",
    //   900,
    //   24,
    //   "1-minute"
    // );
    console.log(
      "1",
      response1.map((item) => ({
        time: Date(item.time),
        value: item.value,
      }))
    );
    // console.log("2", response2);
    // console.log("3", response3);
    // console.log("4", response4);
  } catch (err) {
    console.error(err);
  }
}

router.get("/", (req, res) => {
  main();
  res.send("Hello world");
});

module.exports = router;
