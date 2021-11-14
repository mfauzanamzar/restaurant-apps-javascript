/* eslint-disable no-undef */
const assert = require('assert');

Feature('Unliking Restaurants');
Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing one liked restaurants', async ({ I }) => {
  I.seeElement('#query');
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

Scenario('unliking one restaurant', async ({ I }) => {
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

  I.seeElement('.post-item__button a');

  I.click(firstRestaurants);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.empty-favorite');
});
