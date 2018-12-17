const showroom = require('showroom/puppeteer')({
  headless: false
});

before(async function () {
  await showroom.start();
});

after(async function () {
  await showroom.stop();
});

module.exports = {
  showroom
};