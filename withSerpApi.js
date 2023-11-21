const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch("6fc3b66bb678ff04948a605811cb6c94cbe29719341c9da1797c117d7f8a0022"); //your API key from serpapi.com

const reviewsLimit = 10;

const params = {
  product_id: "8757849604759505625", // Parameter defines the ID of a product you want to get the results for.
  engine: "google_product", // search engine
  device: "desktop", //Parameter defines the device to use to get the results. It can be set to "desktop" (default), "tablet", or "mobile"
  hl: "en", // parameter defines the language to use for the Google search
  gl: "us", // parameter defines the country to use for the Google search
  reviews: true, // parameter for fetching reviews results
};

const getJson = () => {
  return new Promise((resolve) => {
    search.json(params, resolve);
  });
};

exports.getResults = async () => {
  const json = await getJson();
  const results = {};
  results.productResults = json.product_results;
  results.reviewsResult = [];
  while (true) {
    const json = await getJson();
    if (json.reviews_results?.reviews) {
      results.reviewsResult.push(...json.reviews_results.reviews);
      params.start ? (params.start += 10) : (params.start = 10);
    } else break;
    if (results.reviewsResult.length > reviewsLimit) break;
  }
  return results;
};
