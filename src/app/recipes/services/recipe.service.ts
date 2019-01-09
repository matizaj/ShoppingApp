import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [

    new Recipe('A test recipe',
    'description',
    // tslint:disable-next-line:max-line-length
    'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French fries', 20),
    ]),
    new Recipe('A test recipe2',
    'description2',
    // tslint:disable-next-line:max-line-length
    'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
    [
      new Ingredient('Bread', 2),
      new Ingredient('Cheese', 3),
    ])
  ];
  constructor(private shopService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice(); // get only a copy!!
  }

  addIngrToShopList(ing: Ingredient[]) {
    this.shopService.addIngreds(ing);
  }
}