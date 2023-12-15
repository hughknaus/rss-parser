const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');
const Parser = require('./index.js');
const similarity = require('sentence-similarity')
const similarityScore = require('similarity-score')
const parser = new Parser();

let urlList = [
  'https://www.infowars.com/rss.xml',
  'https://okeefemediagroup.com/feed/',
  'https://treeoflibertysociety.com/feed/',
  'https://www.dailywire.com/feeds/rss.xml',
  'https://feeds.feedburner.com/AmericanThinkerBlog',
  'https://feeds.feedburner.com/breitbart',
  'https://www.judicialwatch.org/feed/',
  'https://www.theblaze.com/feeds/feed.rss',
  'https://thefederalist.com/feed/',
  'https://www.wnd.com/feed/',
  'https://www.thegatewaypundit.com/feed/',
  'https://redstate.com/feed/',
];

let selectFewerProps = (feedItem) =>{
  const {title, link} = feedItem;
  return {title, link};
}

let sentenceCompare = (s1, s2) => {
  let winkOpts = { f: similarityScore.winklerMetaphone, options: { threshold: 0 } }
  console.log(similarity(s1, s2, winkOpts))
} 

let getFeed = async (feedUrl) => {
  let feed = await parser.parseURL(feedUrl);
  feed.items = feed.items.slice(0, 5);
  console.log(color.bold.greenBright(`FEED: ${feed.title}`));
  console.log(color.bold.greenBright(`LINK: ${feed.link}`));
  console.log();

  feed.items.forEach(item => {
    console.table(color.cyanBright(`- ARTICLE: ${item.title}`));
    console.log(color.cyanBright(`- LINK: ${item.link}`));
    console.log();
  });
};

urlList.forEach(url => getFeed(url));
