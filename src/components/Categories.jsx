import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Categories() {
  const { categories, setCategories } = useContext(AppContext);
  const { location: { pathname } } = useHistory();

  const categoryUrl = pathname.substring(1);
  const five = 5;
  let url;

  if (categoryUrl === 'meals') {
    url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  } else {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  }

  useEffect(() => {
    fetch(url).then((response) => response.json())
      .then((data) => {
        const prop = categoryUrl === 'meals' ? 'meals' : 'drinks';
        setCategories(data[prop].slice(0, five));
      });
  }, []);

  return (
    <div className="categories-container">
      { categories.length && (
        categories.map((category) => (
          <button
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
          >
            {category.strCategory}
          </button>
        ))
      )}
    </div>
  );
}

export default Categories;
