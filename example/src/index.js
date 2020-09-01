import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Disable missing translation message as translations will be added later.
// We can add a toggle for this later when we have most translations.

// eslint-disable-next-line
const consoleError = console.error.bind(console);
// eslint-disable-next-line
console.error = (message, ...args) => {
  if (
    typeof message.message === 'string' &&
    message.message.startsWith('[@formatjs/intl Error MISSING_TRANSLATION] Missing message:')
  ) {
    return;
  }
  consoleError(message, ...args);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
