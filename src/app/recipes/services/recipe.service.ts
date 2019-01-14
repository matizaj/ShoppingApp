import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
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

  getRecipeId(index: number) {
    return this.recipes[index];
  }
  addRecipe( recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
