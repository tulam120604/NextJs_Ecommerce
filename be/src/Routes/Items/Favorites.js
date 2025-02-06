import express from 'express';
import { create_favorite, detail_favorites_by_user, list_favorites, remove_favorite } from '../../Controllers/Favorites/Favorites.js';
import { middleWare } from '../../middleware/Auth.js';

const Routes_Favorites = express.Router();

Routes_Favorites.get('/list_item_favorite/', middleWare, list_favorites);
Routes_Favorites.get('/detail_item_favorite/:id_user', middleWare, detail_favorites_by_user);
Routes_Favorites.post('/add_item_favorite', middleWare, create_favorite);
Routes_Favorites.post('/remove_item_favorite/:id_user', middleWare, remove_favorite);

export default Routes_Favorites