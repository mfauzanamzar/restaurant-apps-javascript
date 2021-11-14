import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (resto) => `

    <article class="post-item">
            <div class ="post-item__container-thumbnail">
                <img tabindex="0" class="post-item__thumbnail lazyload"
                    data-src=${CONFIG.BASE_IMAGE_URL + resto.pictureId}
                    alt="Gambar restaurant ${resto.name || '-'}    ">
                
            </div>
            <div class ="post-item__content">             
                <p tabindex="0" class ="post-item__city">${resto.city || '-'} <span id="stars" class ="post-item__rating__number">${resto.rating || '-'}/5</span>
                </p>
                <h1 class ="post-item__title"><a href="${`/#/detail/${resto.id || '-'}`}">${resto.name || '-'}</a></h1>
                <p tabindex="0" id="longText" class ="post-item__description">${resto.description || '-'}</p>
            </div>
            <div class="post-item__button">
            <a href="${`/#/detail/${resto.id || '-'}`}"><span>Detail</span></a>
            </div>
    </article>

`;

const createRestaurantDetailTemplate = (resto) => `
    <h2 tabindex="0" class="restaurant__title">${resto.name}</h2>
    <div class="restaurant__poster-container">
        <img tabindex="0" class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name}" />
    </div>
    <div class="restaurant__info">
        <h3 tabindex="0">Information</h3>
            <h4 tabindex="0">City</h4>
            <p tabindex="0">${resto.city}</p>
            <h4 tabindex="0">Address</h4>
            <p tabindex="0">${resto.address}</p>     
            <h4 tabindex="0">Rating</h4>
            <p id='stars' tabindex="0"></p>
            <h4 tabindex="0">Category</h4>
            <p tabindex="0">${resto.categories.map((category) => category.name)}</p>
            <h4 tabindex="0">Foods</h4>
            <p tabindex="0">${resto.menus.foods.map((food) => food.name)}</p>  
            <h4 tabindex="0">Drinks</h4>
            <p tabindex="0">${resto.menus.drinks.map((drink) => drink.name)}</p>      
    </div>
    <div class="restaurant__description">
        <h4 tabindex="0">Description</h4>
        <p tabindex="0">${resto.description}</p> 
    </div>
    <div class="restaurant__overview">     
        <h4 tabindex="0">Review</h4>
        <div class="restaurant-user">        
            <div class="restaurant-user__input">
                <input id="name" placeholder="Your Name.." type="text" name="name" ><br><br>
                <textarea id="review" placeholder="Type your review" name="input-value" rows="10" cols="50"></textarea>
                <input id="submit" type="submit" value="Submit">
            </div>
            ${resto.customerReviews.map((review) => `
            <div class="restaurant-user__reviewer">
                <p class="restaurant-user__user">${review.name} </p>
                <p class=restaurant-user__date> · ${review.date}</p>
            </div>
            <div class="restaurant-user__review">
                <p>${review.review}</p>
            </div>
            `).join('<br>')}
        </div>
    </div> 
`;

const createReviewTemplate = (review) => `
    <div class="restaurant-user__reviewer">
         <p class="restaurant-user__user  temporary-user__user">${review.name} </p>
         <p class=restaurant-user__date> · ${review.date}</p>
    </div>
    <div class="restaurant-user__review  temporary-user__reviewer">
        <p>${review.review}</p>
    </div>`;

const createRestaurantNotFoundTemplate = (errorMessage) => `
    <h1 class="restaurant-notfound">${errorMessage}</h1>
`;

const createCategoryItemTemplate = (cat) => `
    <div class="category-item">
        <h1 class="category-item__title">
            <a href="#">${cat.name}</a>
        </h1>
    </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createCategoryItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createRestaurantNotFoundTemplate,
  createReviewTemplate,
};
