import { async } from 'regenerator-runtime';
import * as model from './model';
import recipeviews from './recipeviews';
import searchView from './searchView';
import resultsView from './resultsView';
import paginationView from './paginationView';
import bookmarkView from './bookmarkView';
import addRecipeView from './addRecipeView';

const recipeContainer = document.querySelector('.recipe');

// APi key = 11cb8120-3803-48c2-b738-f142ebf1e5ad

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// url test 5ed6604591c37cdc054bc886
const controlrecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // loading recipe
    recipeviews.loadingSpinner();
    // update result view to mark selected search results

    await model.loadRecipe(id);

    // rendering recipe

    recipeviews.render(model.state.recipe);
  } catch (error) {
    recipeviews.handleEroor(error);
  }
};

const controlSearchResults = async () => {
  try {
    //1) get search query
    resultsView.loadingSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.handleSearchResults(query);

    // 3) render results
    resultsView.render(model.searchResultPage());
    // 4 render the inittial page
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
const controllPagination = goto => {
  resultsView.render(model.searchResultPage(goto));
  paginationView.render(model.state.search);
};

const controlServings = serving => {
  // update the recipe servings in state
  model.updateSevings(serving);
  // update the recpice view
  // recipeviews.render(model.state.recipe);
  recipeviews.render(model.state.recipe);
};

const controlBookMark = () => {

  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeviews.render(model.state.recipe);
  bookmarkView.render(model.state.bookmark)
};

const controlAddRecpie = (newRecipe)=>{
  
  model.uploadRecpie(newRecipe)
}
const init = () => {
  recipeviews.addhandleRender(controlrecipe);
  recipeviews.addhandlerServing(controlServings);
  recipeviews.addhandlerBookmark(controlBookMark);
  searchView.addhandle(controlSearchResults);
  paginationView.addHandleBtn(controllPagination);
  addRecipeView.addhandlerUpload(controlAddRecpie);
};
init();
