import { async } from 'regenerator-runtime';
import { API_URL, RES_PAGE } from './config';
import { getJson } from './helper';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    eachPage: 1,
    resultPage: RES_PAGE,
  },
  bookmark: [],
};

export const loadRecipe = async id => {
  try {
    const data = await getJson(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmark.some(b => b.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const handleSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        servings: rec.servings,
        cookingTime: rec.cooking_time,
        ingredients: rec.ingredients,
      };
    });
    state.search.eachPage = 1;
  } catch (error) {
    throw error;
  }
};

export const searchResultPage = (page = state.search.eachPage) => {
  state.search.eachPage = page;
  const start = (page - 1) * state.search.resultPage;
  const end = page * state.search.resultPage;

  return state.search.results.slice(start, end);
};

export const updateSevings = newSevrings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newSevrings) / state.recipe.servings;
  });
  state.recipe.servings = newSevrings;
};
const addBookmarkToLocalStore = () => {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
};

export const addBookmark = recipe => {
  // add bookmark
  state.bookmark.push(recipe);
  // mark current recpie as bookmarks
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  addBookmarkToLocalStore();
};

export const deleteBookmark = id => {
  // remove bookmark
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);

  // mark cur recipe as bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  addBookmarkToLocalStore();
};

const init = () => {
  const storage = localStorage.getItem('bookmark');
  if (storage) state.bookmark = JSON.parse(storage);
};

init();

export const uploadRecpie = async function (newRecipe) {
  
  const ingredients = Object.entries(newRecipe).filter(
    entry => entry[0].startsWith('ingredient') && entry[1] !== ''
  ).map(ing=>{
    const [quantity,unit,description] = ing[1].replaceAll('','').split(',')
    return{quantity : quantity ? +quantity:null,unit,description};
   })
  console.log(ingredients);
};
