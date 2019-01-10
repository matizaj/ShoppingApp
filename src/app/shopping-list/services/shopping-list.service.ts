import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes ', 10  )
  ];
  constructor() { }

  getIngredients() {
    return this.ingredients.slice(); // make a real copy!
  }

  addIngredients(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngreds(ingredients: Ingredient[]) {
    // for (let ingredient of ing) {
    //   this.addIngredients(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
