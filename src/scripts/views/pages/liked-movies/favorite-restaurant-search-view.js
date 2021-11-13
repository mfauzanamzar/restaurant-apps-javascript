import { createRestaurantItemTemplate, createRestaurantNotFoundTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return ` 
    <div class="search-favorite__container">
     <input placeholder="search your favorite restaurants..." id="query" type="text">
     <div class="search-favorite__button ">
        <button aria-label="search favorite restaurant"><i class="fa fa-search"></i></button>
     </div>  
    </div>
    <div class="border-line__container">
      <div class="border-line"></div>
   </div>
    <div class="restaurant-not-found" id="restaurant-not-found"></div>   
        <section class="content">
            <div id="favorite" class="explore favorite">
                <h1 tabindex="0" class="explore__label">Favorite Restaurant</h1>                
                <div id="loadingFavorite" class="lds-dual-ring"></div> 
                <div id="posts" class="posts-container favorites-container"></div>
            </div>
        </section>
        <footer>
        <div class="footer">
            <p>All data obtained from 
                <a tabindex="-1" href="https://restaurant-api.dicoding.dev/" target="_blank" rel="noreferrer">Dicoding</a>
            </p>
        </div>
        
    </footer>
           `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showLoading() {
    const loaderFavorite = document.querySelector('#loadingFavorite');
    window.onload = function () {
      loaderFavorite.style.display = 'none';
    };
    window.onload();
  }

  showError(error) {
    const restaurantNotFound = document.querySelector('#restaurant-not-found');
    const favoriteContainer = document.querySelector('#favorite');
    restaurantNotFound.style.display = 'block';
    let errorMessage;
    if (error.message === 'Failed to fetch') {
      errorMessage = 'Please, check your internet connection';
    } else {
      errorMessage = 'Sorry, something wrong happened';
    }
    favoriteContainer.style.display = 'none';
    restaurantNotFound.innerHTML = createRestaurantNotFoundTemplate(errorMessage);
  }

  showMovies(restaurants) {
    this.showFavoriteRestaurants(restaurants);
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    this.showLoading();
    const posts = document.querySelector('#posts');
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '',
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
      posts.style.display = 'flex';
    }

    posts.innerHTML = html;

    document.getElementById('posts')
      .dispatchEvent(new Event('posts:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<h2 id="empty-favorite" class="empty-favorite">Tidak ada restaurant untuk ditampilkan</h2>';
  }
}

export default FavoriteRestaurantSearchView;
