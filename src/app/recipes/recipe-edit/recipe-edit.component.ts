import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { identifierModuleUrl } from '@angular/compiler';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe( data => {
      this.id = +data['id'];
      this.editMode = data['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeId(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }
  onSubmit() {
    // const newRecipe = new Recipe(this.recipeForm.value['name'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients']);
    if (this.editMode === true) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
    this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }
  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
