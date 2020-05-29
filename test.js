const HCCrawler = require('headless-chrome-crawler');
const JSONLineExporter = require('headless-chrome-crawler/exporter/json-line');

const FILE = './output.jsonl';

const exporter = new JSONLineExporter({
  file: FILE,
  fields: ['response.url','result'],
});

(async () => {
  const crawler = await HCCrawler.launch({
    exporter: exporter,
    // maxRequest: 30,
    //maxConcurrency: 1,
    // Function to be evaluated in browsers
    evaluatePage: (() => {
      // html: document.documentElement.outerHTML,
      // html: $('main').not("main > article > .rns").text(),
      $('.rns, .tag-links, .share-and-page-modified, .child-page-link-list, .page-link-lists').remove();
      return $('main').text()
    }),
    // Function to be called with evaluated results from browsers
    onSuccess: (result => {
      console.log(result.response.url);
    }),
  });
  // Queue a request
  await crawler.queue({url: 'https://www.vero.fi/', jQuery: true, maxDepth: 40, allowedDomains: ["www.vero.fi"]});
  // await crawler.queue({url:'http://epsilon-it.utu.fi/', jQuery:false, maxDepth: 3});
  // Queue a request with custom options
  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler
})();
