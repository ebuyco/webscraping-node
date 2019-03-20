

import axios from 'axios';
import cheerio from 'cheerio';


export async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getTwitterFollowers(html) {
  // load up cheerio
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data('count');
}


export async function getInstagramFollowers(html) {
  // const {data} = await axios.get(`https://www.instagram.com/${username}/?__a=1`)
  // console.log(data);

  // const $ = cheerio.load(html);
  // const span = $('[data-nav="followers"] .ProfileNav-value');
  // return span.data('count');

  const $ = cheerio.load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  const pageObject = JSON.parse(dataInString);
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}
