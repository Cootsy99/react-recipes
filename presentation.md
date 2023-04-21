# What is the application about?

I chose to do an online recipe book.

_Appliction Demo_

# User Stories

<!-- <p style="color:darkgreen">some *blue* text</span>. -->

- AAU I want to be able to see all my recipes in alphabetical order so that I can easily navigate to the recipe I want ✅

- AAU I want my recipes to be categorised by cuisine type, e.g. Italian, Indian, Chinese etc. so that I can easily pick out recipes of a certain cuisine type ✅

- AAU I want my recipes to be categorised by popular ingredients, e.g. chicken, fish, noodles so that I can pick out recipes that suit the ingredients I have in the house. E.g. if I have chicken in the fridge, it would be helpful to see all the recipes that include chicken. ✅

- AAU I want to be able to add new recipes from an online recipe book (recipe API) so that I can build up my own recipe bank with recipes that I like/want to try out. ✅

- AAU I want to be able to randomly generate a recipe from an online recipe book so that I can get inspiration for what to cook when I can't decide what I want to eat. ✅

- AAU I want to be able to randomly generate a recipe from my recipe bank so that I can get inspiration for what to cook (from dishes I know I like), when I can't decide what I want to eat. ❌

- AAU I want to be able to search for specific dishes and get the recipe for them, both within my recipe bank and an online recipe book so that I can quickly find the recipe I am looking for. ✅

- AAU I want to have a list of ingredients and quantities for my recipe so I know exactly how much of each ingredient I need to make that meal. ✅

- AAU I want to see a step by step guide of how to cook the meal so that it is really clear and simple to cook the meal. ✅

- AAU I want to be able to be able to add / remove ingredients from a recipe so that I can add my own twist to a recipe. ✅
- AAU I want to be able to edit the quantities of ingredients for a recipe so that I can add my own twist to a recipe. ✅

- AAU I want to be able to add / remove method steps from a recipe so that I can make the method clearer and/or simpler. ✅

- AAU I want to be able to edit method steps from a recipe so that I can make the method clearer and/or simpler. ✅

- AAU I want to be able to add notes to a recipe so that if there's some info I want to remember, like how many it feeds or certain tweaks that can be made to have different variations, I can do it. ❌

- AAU I want to be able to favorite a recipe so that I can see all of my favorite recipes in one place ❌

- AAU I want to be able to create recipes from scratch, so that I don't have to rely on the online recipe book (API) for my recipes ❌

- AAU I want popular recipes to exist in my recipe book by default so that I have some recipes at the start. ✅

# Features

### General

- Nav Bar
- Recipe List (All / by Cuisine / by Category)
- Search functionality within own recipes
- Search for recipes in online bank via an API
- Randomly generate a recipe from online bank via an API

### For each Recipe

- Add to 'My Recipes'
- Picture of the dish
- Ingredients list with pictures & quantities
- Method List
- Add/Edit/Delete each ingredeint & step
- Select and delete ingredients & steps
- Delete all ingredients & steps
- A 'make mode' where you can cross off each ingredient/step

# The API

https://www.themealdb.com/api.php

# A piece of code

One bit of code I liked required the use of the hooks `useLocation`, `useEffect` & `useState` to highlight the current page on the nav bar.
<br>
<br>

## What does the `useLocation` hook do?

- The `useLocation` Hook allows you to access the object that represents the active URL.
- The location object changes whenever the user navigates to a new URL.

<br>
<br>

For example, this is the nav bar after we have navigated to the 'My Recipes By Cuisine' page:

<br>

<p align="center">
<img src="src/NavBar.png" alt="nav bar with 'My Recipes By Cuisine' highlighted"  width=100% height=50%>
</p>

<br>

The bulk of the code to achieve this is shown below:
<br>

```js
const [activeTab, setActiveTab] = useState("Home");

const location = useLocation();

useEffect(() => {
  const pageKeywords = ["Category", "All", "Cuisine", "New"];
  const currentPage = pageKeywords.filter((keyWord) =>
    window.location.href.includes(keyWord)
  );
  window.location.href.slice(-1) === "/"
    ? setActiveTab("Home")
    : setActiveTab(currentPage[0]);
}, [window.location.href]);
```

The activeTab state is passed down to the Nav component as props and inline styling is used to highlight the active tab.

# Most Difficult Part

## What

- Implementing seemingly simple functionality in the latter stages of the project

## Why

- Tight timescales
- Ambitious end product
- Cutting corners

<br>
<br>

# Favorite Part

- The feeling when a `useEffect` actually started doing what you wanted.

# Bugs & Improvements

## Bugs

- Checkbox bug

## Improvements

- ➡️ Make responsive
- Ability to favorite recipes and the home page genuinely displays favorites
- Ability to browse by cuisine / category
- Ingredient icons when you click 'make recipe'
- Ingredient icons when you view a recipe that's not currently in your recipe bank
- ➡️ Local storage or similar so that any new recipes you add / any recipes that you edit are stored for when you come back another day
- Ability to create a blank recipe
- Ability to have notes for a recipe
- Include multiple APIs for recipe search as current one is slightly limited
- Ability to randomly generate a recipe from own recipe book
- Add video links for recipes where appropriate
- Cooler styling
