/* eslint-disable func-names */
/* eslint-disable no-plusplus */
import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate, createRestaurantNotFoundTemplate, createReviewTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';

const Detail = {
  async render() {
    return `
      <div class="restaurant-not-found" id="restaurant-not-found"></div>            
      <div id="loadingDetail" class="lds-dual-ring"></div>
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
      <footer>
        <div class="footer">
            <p>All data obtained from 
                <a tabindex="-1" href="https://restaurant-api.dicoding.dev/" target="_blank" rel="noreferrer">Dicoding</a>
            </p>
        </div>
        
    </footer>
      `;
  },

  async afterRender() {
    try {
      this._hideBanner();
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const resto = await RestaurantSource.detailRestaurant(url.id);
      const restaurantsContainer = document.querySelector('#restaurant');
      restaurantsContainer.innerHTML = createRestaurantDetailTemplate(resto.restaurant);
      this._showRating(resto);
      this._showLoading();
      this._addConsumerReview(url);
      this._LikeButtonInitiator(resto);
    } catch (error) {
      this._errorMessage(error);
    }
  },

  async _addConsumerReview(url) {
    const submit = document.querySelector('#submit');
    submit.addEventListener('click', async (event) => {
      event.preventDefault();
      const inputName = document.querySelector('#name').value;
      const inputReview = document.querySelector('#review').value;

      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      let today = new Date();
      const dd = String(today.getDate());
      const mm = months[today.getMonth()];
      const yyyy = today.getFullYear();

      today = `${dd} ${mm} ${yyyy}`;
      const review = {
        id: url.id,
        name: inputName,
        review: inputReview,
        date: today,
      };
      console.log(this._date());

      const reviewContainer = document.querySelector('.restaurant-user');
      await RestaurantSource.postReviews(review);
      reviewContainer.innerHTML += createReviewTemplate(review);
    });
  },

  _LikeButtonInitiator(resto) {
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: resto.restaurant.id,
        name: resto.restaurant.name,
        city: resto.restaurant.city,
        description: resto.restaurant.description,
        pictureId: resto.restaurant.pictureId,
        rating: resto.restaurant.rating,
      },
    });
  },

  _showLoading() {
    const loaderDetail = document.querySelector('#loadingDetail');
    window.onload = function () {
      loaderDetail.style.display = 'none';
    };
    window.onload();
  },

  _hideBanner() {
    const banner = document.querySelector('hero-banner');
    banner.style.display = 'none';
  },

  _showRating(resto) {
    const stars = document.querySelector('#stars');
    const numberOfStars = resto.restaurant.rating;
    for (let i = 1; i <= numberOfStars; i++) {
      const star = '⭐️';
      stars.innerHTML += star;
    }
  },

  _errorMessage(error) {
    const restaurantNotFound = document.querySelector('#restaurant-not-found');
    restaurantNotFound.style.display = 'block';
    let errorMessage;
    if (error.message === 'Failed to fetch') {
      errorMessage = 'Please, check your internet connection';
    } else {
      errorMessage = 'Sorry, something wrong happened';
    }
    restaurantNotFound.innerHTML = createRestaurantNotFoundTemplate(errorMessage);
  },

  _date() {
  },
};

export default Detail;
