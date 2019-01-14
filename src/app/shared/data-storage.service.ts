import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RecipeService } from '../recipes/services/recipe.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService) { }
  apiUrl = 'https://ng-recipe-book-cfe4c.firebaseio.com/recipes.json';

  storeRecipes() {
    return this.http.put(this.apiUrl, this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get(this.apiUrl)
    .map( response => {
      const recipes = response.json();
      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
          console.log(recipe);
          recipe['ingredients'] = [];
        }
      }
      return recipes;
    })
    .subscribe( recipes => {
      this.recipeService.setRecipes(recipes);
    });
  }
}
