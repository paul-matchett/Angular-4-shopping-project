import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Peperoni Pizzi', 
      'A super-tasty pizza - just awesome', 
      'http://www.pngall.com/wp-content/uploads/2016/05/Pizza-Free-Download-PNG.png',
      [
        new Ingredient('Cheese', 1),
        new Ingredient('Peperoni', 20)
      ])
    ,
    new Recipe(
      'Big Fat Burger', 
      'What else you need to say', 
      'http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4160.png',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])  
  ];

  constructor(private shoppingListService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

}
