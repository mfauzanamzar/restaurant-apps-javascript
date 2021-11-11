/* eslint-disable no-undef */
const assert = require('assert');

Feature('Add Review Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('showing list restaurants', ({ I }) => {
  I.seeElement('.post-item__button a');
});

Scenario('opening detail restaurant', ({ I }) => {
  I.seeElement('.post-item__button a');

  const firstRestaurants = locate('.post-item__button a').first();
  I.click(firstRestaurants);
});

Scenario('adding review restaurant', async ({ I }) => {
  I.seeElement('.post-item__button a');

  const firstRestaurants = locate('.post-item__button a').first();
  I.click(firstRestaurants);

  I.seeElement('#name');
  I.seeElement('#review');
  I.seeElement('#submit');

  const name = 'Hendra';
  const review = 'Restaurant paling enak';

  I.fillField('#name', name);
  I.fillField('#review', review);
  I.click('#submit');

  const itemName = locate('.restaurant-user__user').last();
  const itemReview = locate('.restaurant-user__review p').last();

  const reviewName = await I.grabTextFrom(itemName);
  const reviewReview = await I.grabTextFrom(itemReview);

  assert.strictEqual(name, reviewName);
  assert.strictEqual(review, reviewReview);
});
