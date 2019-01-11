import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shop') slForm: NgForm;
  editMode = false;
  subscription: Subscription;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shopService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shopService.startedEditing.subscribe( data => {
      this.editMode = true;
      this.editedItemIndex = data;
      this.editedItem = this.shopService.getIngredient(data);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shopService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
    this.shopService.addIngredients(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetForm() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.resetForm();
    this.shopService.deleteIngredient(this.editedItemIndex);
  }
}
