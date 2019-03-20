
import express from 'express';
import { 
    getHTML, getTwitterFollowers, getInstagramFollowers
} from './lib/scraper';

const app = express();

app.get('/scrape', async(req,res,next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if (err) {
          return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
        })
})

const PORT = process.env.PORT || 2132

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}...`);
})

async function go(){
    // const html = await getHTML('https://twitter.com/ERNIEBUYCO');
    // const twCount = await getTwitterFollowers(html);

    // console.log(`You have ${twCount} followers`);    

    // const followers = await getInstagramFollowers('erniebuyco');


    const iPromise = getHTML('https://instagram.com/erniebuyco');
    const tPromise = getHTML('https://twitter.com/ERNIEBUYCO')
    const [instagramHTML, twitterHTML] = await Promise.all(
        [iPromise, tPromise]
    );
    const instagramCount = await getInstagramFollowers(instagramHTML);
    const twCount = await getTwitterFollowers(twitterHTML);
    console.log(`You have ${twCount} twitter followers and  
    ${instagramCount} instagram followers`);
  } 

go();