import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
private subscription: Subscription;

  constructor(private shopService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shopService.getIngredients();
    this.subscription = this.shopService.ingredientsChanged.subscribe((data: Ingredient[]) => {
      this.ingredients = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shopService.startedEditing.next(index);
  }
}
