const express = require("express");
const router = express.Router();

const { investing } = require("investing-com-api");
// const yahooFinance = require("yahoo-finance2").default; // NOTE the .default
var yahooFinance = require("yahoo-finance");

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
    /**
     * getIntraDayOptions
     *
     * yahooFinance api로 차트 데이터를 받아올 때 필요한 기간 옵션 객체를 만드는 메소드
     *
     * @param period 기간 문자열
     */
    function getIntraDayOptions(period) {
      const { interval, dateFrom, dateTo } = IntraDayChartMap[period];
      return { period: interval, from: dateFrom(), to: dateTo() };
    }
    function getDateString(timeStamp) {
      const date = new Date(timeStamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    }
    const currentTimeStamp = Date.now();
    const lastYearTimeStamp = currentTimeStamp - 1000 * 3600 * 24 * 365;
    // const results = await yahooFinance._chart("AAPL", {
    //   period1: 1640000000000,
    //   period2: 1640600000000,
    //   interval: "1d",
    // });

    const getPastDateString = ({ day = 0, month = 0, year = 0 } = {}) => {
      const date = new Date();
      const y = date.getFullYear();
      const m = date.getMonth();
      const d = date.getDate();
      date.setFullYear(y - year);
      date.setMonth(m - month);
      date.setDate(d - day);

      return date
        .toLocaleDateString()
        .split(". ")
        .map(Number)
        .map((n) => n.toString().padStart(2, "0"))
        .join("-");
    };

    const IntraDayChartMap = {
      "1d": {
        interval: "d",
        dateFrom: () => getPastDateString({ day: 1 }),
        dateTo: () => getPastDateString(),
      },
      "1w": {
        interval: "d",
        dateFrom: () => getPastDateString({ day: 7 }),
        dateTo: () => getPastDateString(),
      },
      "1m": {
        interval: "d",
        dateFrom: () => getPastDateString({ month: 1 }),
        dateTo: () => getPastDateString(),
      },
      "1y": {
        interval: "d",
        dateFrom: () => getPastDateString({ year: 1 }),
        dateTo: () => getPastDateString(),
      },
      "5y": {
        interval: "w",
        dateFrom: () => getPastDateString({ year: 5 }),
        dateTo: () => getPastDateString(),
      },
      max: {
        interval: "m",
        dateFrom: () => getPastDateString({ year: 1000 }),
        dateTo: () => getPastDateString(),
      },
    };

    const results = await yahooFinance.historical({
      symbol: "AAPL",
      from: getDateString(lastYearTimeStamp),
      to: getDateString(currentTimeStamp),
      period: "w",
    });

    // symbol,
    // from: this.getDateString(lastYearTimeStamp),
    // to: this.getDateString(currentTimeStamp),

    // const results = await yahooFinance.historical("AAPL", {
    //   period1: 493590046,
    //   period2: 1913180947,
    //   interval: "1wk",
    // });

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
