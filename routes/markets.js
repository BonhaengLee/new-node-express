const express = require("express");
const router = express.Router();

const { investing } = require("investing-com-api");
const yahooFinance = require("yahoo-finance2").default; // NOTE the .default

async function main() {
  try {
    // const response1 = await investing("currencies/eur-usd");
    // const response2 = await investing("currencies/eur-usd", 3600, 24, "1-day"); // With optional params
    // const response3 = await investing("currencies/eur-usd", 1800, 24, "1-hour"); // With optional params
    // const response4 = await investing(
    //   "currencies/eur-usd",
    //   900,
    //   24,
    //   "1-minute"
    // );

    // const response1 = await investing("indices/nq-100", 300, 24, "1-day");
    // const response1 = await investing("indices/nq-100", 300, 24, "1-day");
    // const results = await yahooFinance.search("AAPL");
    // const results = await yahooFinance.search("AAPL", {
    //   symbol: "AAPL",
    //   comparisons: "MSFT",
    //   range: "1mo",
    //   region: "US",
    //   interval: "1d",
    // });
    // Get chart data by ticker with node-yahoo-finance2
    const results = await yahooFinance.historical("AAPL", {
      period1: 493590046,
      period2: 1913180947,
      interval: ["1m"],
    });

    // .quoteSummary("TSLA", {
    //   // Get market price change data per minute from node-yahoo-finance-api
    //   modules: [
    //     "price",
    //     "summaryDetail",
    //     "defaultKeyStatistics",
    //     "financialData",
    //     "calendarEvents",
    //     "earnings",
    //     "recommendationTrend",
    //     "earningsTrend",
    //   ],
    // });

    // const { regularMarketPrice, currency } = quote;

    // console.log(
    //   "1",
    //   response1.map((item) => ({
    //     time: Date(item.time),
    //     value: item.value,
    //   }))
    // );
    // console.log("2", response2);
    // console.log("3", response3);
    // console.log("4", response4);

    // console.log(
    //   "1",
    //   // response1.map((item) => ({
    //   //   // time: Date(item.time),
    //   //   time: item.time,
    //   //   value: item.value,
    //   // }))
    //   response1
    // );
    console.log(
      "1",
      // response1.map((item) => ({
      //   // time: Date(item.time),
      //   time: item.time,
      //   value: item.value,
      // }))

      results
    );
  } catch (err) {
    console.error(err);
  }
}

router.get("/", (req, res) => {
  main();
  res.send("Hello world");
});

module.exports = router;
