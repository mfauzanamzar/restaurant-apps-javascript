import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import ListRestaurant from '../views/pages/list-restaurant';

const routes = {
  '/': ListRestaurant, // default page
  '/list-restaurant': ListRestaurant,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
