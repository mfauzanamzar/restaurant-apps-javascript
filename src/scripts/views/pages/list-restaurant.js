/* eslint-disable func-names */
import RestaurantSource from '../../data/restaurant-source';
import { createCategoryItemTemplate, createRestaurantItemTemplate, createRestaurantNotFoundTemplate } from '../templates/template-creator';
import category from '../../../CATEGORY.json';

const ListRestaurant = {
  async render() {
    return `
    <div class="search-favorite__container">
    <input placeholder="search your favorite restaurants..." id="query" type="text">
    <div class="search-favorite__button ">
       <button aria-label="search restaurant"><i class="fa fa-search"></i></button>
    </div>  
   </div>
   <div class="border-line__container">
      <div class="border-line"></div>
   </div>
    <div class="restaurant-not-found" id="restaurant-not-found"></div>
        <section id="content" class="content">
            <div class="explore">
                <h1 tabindex="0" class="explore__label">Explore Restaurant</h1>                
                <div id="loadingRestaurant" class="lds-dual-ring"></div>
                <div id="posts" class="posts-container"></div>
            </div>
            <div class="category">
                <h1 tabindex="0" class="category__label">Category</h1>
                <div id="loadingCategory" class="lds-dual-ring"></div>
                <div id="categorys" class="category-container"></div>
            </div>
        </section>
      `;
  },

  async afterRender() {
    try {
      this._showRestaurants();
      this._searchRestaurants();
    } catch (error) {
      this._errorMessage(error);
    }
  },

  async _showRestaurants() {
    const restaurants = await RestaurantSource.listRestaurants();
    const restaurantsContainer = document.querySelector('#posts');
    const categoryContainer = document.querySelector('#categorys');
    this._hideLoading();
    this._itemTemplateRestaurant(restaurants, restaurantsContainer);
    this._shortenText();
    this._categoryItemTemplate(categoryContainer);
  },

  async _searchRestaurants() {
    const query = document.getElementById('query');

    query.addEventListener('change', async (e) => {
      const searchString = e.target.value;
      const restaurantsContainer = document.querySelector('#posts');
      let foundRestaurants;
      if (searchString.length > 0) {
        foundRestaurants = await RestaurantSource.searchRestaurant(searchString);
      } else {
        foundRestaurants = await RestaurantSource.listRestaurants();
      }
      this._itemTemplateRestaurant(foundRestaurants, restaurantsContainer);
    });
  },

  _itemTemplateRestaurant(restaurants, restaurantsContainer) {
    const html = restaurants.reduce(
      (carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '',
    );

    restaurantsContainer.innerHTML = html;
  },

  _categoryItemTemplate(categoryContainer) {
    category.category.forEach((cat) => {
      categoryContainer.innerHTML += createCategoryItemTemplate(cat);
    });
  },

  _shortenText() {
    const limitCharacter = 310;
    const contents = document.querySelectorAll('.post-item__description');
    contents.forEach((content) => {
      if (content.textContent.length < limitCharacter) {
        content.nextElementSibling.style.display = 'none';
      } else {
        const displayText = content.textContent.slice(0, limitCharacter);
        content.innerHTML = `${displayText}<span>...</span>`;
      }
    });
  },

  _hideLoading() {
    const loaderRestaurant = document.querySelector('#loadingRestaurant');
    const loaderCategory = document.querySelector('#loadingCategory');
    window.onload = function () {
      loaderRestaurant.style.display = 'none';
      loaderCategory.style.display = 'none';
    };
    window.onload();
  },

  _errorMessage(error) {
    this._hideLoading();
    const restaurantNotFound = document.querySelector('#restaurant-not-found');
    const contentContainer = document.querySelector('#content');
    restaurantNotFound.style.display = 'block';
    let errorMessage;
    if (error.message === 'Failed to fetch') {
      errorMessage = 'Please, check your internet connection';
    } else {
      errorMessage = 'Sorry, something wrong happened';
    }
    contentContainer.style.display = 'none';
    restaurantNotFound.innerHTML = createRestaurantNotFoundTemplate(errorMessage);
  },
};

export default ListRestaurant;
