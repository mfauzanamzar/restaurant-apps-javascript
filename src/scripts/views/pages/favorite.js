/* eslint-disable func-names */
import FavoriteRestaurant from '../../data/favoriterestaurant-idb';
import { createRestaurantItemTemplate, createRestaurantNotFoundTemplate } from '../templates/template-creator';
import FavoriteRestaurantSearchPresenter from './liked-movies/favorite-restaurant-search-presenter';
import FavoriteRestaurantSearchView from './liked-movies/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './liked-movies/favorite-restaurant-show-presenter';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurant });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurant });
  },
};

export default Favorite;
