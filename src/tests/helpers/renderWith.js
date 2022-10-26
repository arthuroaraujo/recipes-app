import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

// function withRedux(component, store) {
//   return (
//     <Provider store={ store }>
//       { component }
//     </Provider>
//   );
// }

function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export default renderWithRouter;
