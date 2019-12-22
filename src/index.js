import React, {Suspense, StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import Error from './page/error'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<Error>
  <StrictMode>
    <Suspense fallback={<div>loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>
</Error>
, document.getElementById('reefaqua'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
