import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Categories() {
  const {
    categories,
    setCategories, setRecipes } = useContext(AppContext);

  const { location: { pathname } } = useHistory();

  const foodType = pathname.substring(1);
  const twelve = 12;
  const five = 5;
  let url;

  if (foodType === 'meals') {
    url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  } else {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  }

  useEffect(() => {
    fetch(url).then((response) => response.json())
      .then((data) => {
        const prop = foodType === 'meals' ? 'meals' : 'drinks';
        setCategories(data[prop].slice(0, five));
      });
  }, []);

  const getByCategory = async (urlCat) => {
    const request = await fetch(urlCat);
    const result = await request.json();
    return result[foodType].splice(0, twelve);
  };

  const restoreClass = () => {
    const cats = document.querySelectorAll('[data-category]');
    cats.forEach((category) => {
      category.className = 'category';
    });
  };

  const resetAllCategories = async () => {
    let link;
    if (foodType === 'meals') {
      link = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    } else {
      link = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }
    const request = await fetch(link);
    const result = await request.json();
    return result[foodType].splice(0, twelve);
  };

  const reset = async () => {
    const result = await resetAllCategories();
    setRecipes(result);
    restoreClass();
  };

  const toggleFilterCategory = async ({ target }) => {
    const { dataset: { category } } = target;
    let categoryUrl;
    if (foodType === 'meals') {
      categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    } else {
      categoryUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    }

    let result;

    if (target.className === 'category') {
      result = await getByCategory(categoryUrl);
      setRecipes(result);
      target.classList.remove('category');
      document.querySelectorAll('[data-category]').forEach((cat) => {
        if (target !== cat) {
          cat.className = 'category';
        }
      });
    } else {
      result = await resetAllCategories();
      setRecipes(result);
      target.classList.add('category');
    }
  };

  return (
    <div className="categories-container">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ reset }
      >
        All
      </button>
      { categories.length && (
        categories.map((category) => (
          <button
            className="category"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            onClick={ toggleFilterCategory }
            data-category={ category.strCategory }
          >
            {category.strCategory}
          </button>
        ))
      )}
    </div>
  );
}

export default Categories;
