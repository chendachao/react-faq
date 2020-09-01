import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Disable missing translation message as translations will be added later.
// We can add a toggle for this later when we have most translations.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
