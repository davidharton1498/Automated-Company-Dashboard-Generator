const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path'); 
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static('public'));
const { ApifyClient } = require('apify-client');
// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: 'apify_api_WUtA1nl4bi3pdj3QiYiptzqTerwehH28Q6aK',
});
// Prepare Actor input
const input = {
  "language": "en",
  "maxReviews": 5,
  "personalData": true,
  "reviewsSort": "newest",
  "startUrls": [
    {
      "url": "https://google.com/maps/place/Domino's+Pizza+Paris+15+Cambronne/@48.8584563,2.2742733,14z/data=!4m10!1m2!2m1!1sdominos+pizza!3m6!1s0x47e6703cdcd00001:0x106d3f9c81fe3532!8m2!3d48.8458574!4d2.3021046!15sCg1kb21pbm9zIHBpenphIgOIAQFaDyINZG9taW5vcyBwaXp6YZIBEHBpenphX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F11bzr78443?entry=ttu"
    }
  ]
};
const reviews=[];

(async () => {
  try {
    const run = await client.actor("compass/Google-Maps-Reviews-Scraper").call(input);

    // Fetch and print Actor results from the run's dataset (if any)
    console.log('Results from dataset');
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    items.forEach((item) => {
        //console.dir(item);
        //console.log(item.title)
        const review={
        "title":item.title,
        "categoryName": item.categoryName,
        "website": item.website,
        "url": item.url,
        "reviewsCount": item.reviewsCount,
        "stars": item.stars,
        "text": item.text
        }
        reviews.push(review)
    });
      console.log(reviews);
  } catch (error) {
      console.error('Error during execution:', error);
  }
})();

const withPuppeteer = require("./getReviews");
const withSerpApi = require("./withSerpApi");
const getReviews = require('./getReviews')

// Set EJS as the view engine
//app.set('view engine', 'ejs');
//app.set('views', __dirname + '/views'); // Assuming your EJS files are in a 'views' folder

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

app.post('/generate-dashboard', async (req, res) => {
  try {
    const { commercial_names, address_txt } = req.body;
    const searchTerm = `${commercial_names} ${address_txt}`;
    const reviewsData = await getReviews(searchTerm, 'object');

        // Check if reviews data is available
        //if (reviewsData && reviewsData.reviewAuthorNames.length > 0) {
            // Render the dashboard template with the reviewsData
            //res.render('public/index', { reviewsData });
        //} else {
            // Handle case where no reviews are available
            //res.render('no-reviews');
        //}
    // Validate required fields
    if (!commercial_names) {
      return res.status(400).json({ error: 'Bad Request', message: 'Company Name is required' });
    }
    if (!address_txt) {
      return res.status(400).json({ error: 'Bad Request', message: 'address_txt is required' });
    }
    //withSerpApi.getResults().then((result) => console.log(result, { depth: null }));
    // Implement logic to use the Veridion API
    const enrichedData = await enrichData(req.body);

    // Check if the response from Veridion is successful
    if (enrichedData && enrichedData.status === 200) {
      res.json(enrichedData.data);
    } else {
      // Handle unexpected response from the Veridion API
      console.error('Unexpected response from Veridion API:', enrichedData);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});


// Function to enrich data using the Veridion API
async function enrichData(data) {
  try {
    const response = await axios.post('https://data.soleadify.com/match/v4/companies', data, {
      headers: {
        'x-api-key': 'T0U9qKCVhtiDBUdblJovoz1Af70P7TeNsYOjWJ7K8gXngbB97PGnMAo4JNiA',
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error from Veridion API:', error.message);

    // Check if Veridion returned an error response
    if (error.response) {
      return error.response;
    }

    // If it's a network error, re-throw for higher-level handling
    throw error;
  }
}


app.get('/in', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(port, () => {
  console.log(`Serverul rulează pe portul ${port}`);
});
