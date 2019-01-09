import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipe: Recipe[];
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipes();
  }
  addNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
