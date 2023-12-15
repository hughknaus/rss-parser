const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');
const Parser = require('./index.js');
let parser = new Parser();

let urlList = [
  'https://www.thegatewaypundit.com/feed/',
  'https://redstate.com/feed/'
];

let selectFewerProps = (feedItem) =>{
  const {title, link} = feedItem;
  return {title, link};
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
