import express from 'express';
import cors from 'cors';
import {uniqueCount} from './lib/utils';
import {
  getInstagramCount,
  getTwitterCount
} from './lib/scraper';
import db from './lib/db';
import './lib/cron';

// load express
const app = express();
console.log(db);
//  const PORT = process.env.PORT || 2132;

// load the cors package
app.use(cors());

app.get('/scrape', async (req, res, next) => {
  console.log('Scrapping');
  const [iCount, tCount] = await Promise.all(
    [
      getInstagramCount(),
      getTwitterCount()
    ]
  );
  res.json({ iCount, tCount });
});

app.get('/data', async (req, res, next) => {
  // get the scrape data
  // const twitter = db.get('twitter').value();
  const { twitter, instagram } = db.value();

  // filter unique values goes here
  const uniqueTwitter = uniqueCount(twitter);
  const uniqueInstagram= uniqueCount(instagram); 

  // respond with json
  res.json({ twitter: uniqueTwitter,instagram : uniqueInstagram });
});

// app.listen(PORT, () => {
//     console.log(`App listening to ${PORT}...`);
// })


app.listen(2132, () => {
  console.log('App running on port http://localhost:2132');
});
