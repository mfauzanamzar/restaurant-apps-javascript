/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.empty-favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.empty-favorite');

  I.amOnPage('/');

  I.seeElement('.post-item__button a');

  const firstRestaurants = locate('.post-item__button a').first();
  const firstRestaurantsTitle = await I.grabTextFrom('.post-item__title');
  I.click(firstRestaurants);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');
  const likedRestaurantsTitle = await I.grabTextFrom('.post-item__title');

  assert.strictEqual(firstRestaurantsTitle, likedRestaurantsTitle);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.empty-favorite');

  I.amOnPage('/');

  I.seeElement('.post-item__title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.post-item__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.restaurant__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedMovies = await I.grabNumberOfVisibleElements('.post-item');
  assert.strictEqual(matchingRestaurants.length, visibleLikedMovies);

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.post-item__title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});
