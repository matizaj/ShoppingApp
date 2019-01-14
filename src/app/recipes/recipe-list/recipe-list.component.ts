import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipe: Recipe[];
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }
  subscription = new Subscription();
  ngOnInit() {
    this.recipe = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipeChanged.subscribe( data => {
      this.recipe = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  addNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
