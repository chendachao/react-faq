// import React from 'react'

// import { ExampleComponent } from 'react-faq'
// import 'react-faq/dist/index.css'

// const App = () => {
//   return <ExampleComponent text="Create React Library Example 😄" />
// }

// export default App

import './App.css';
import 'react-faq/dist/index.css'

import React, { useState, useEffect }  from 'react';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Link,
} from 'react-router-dom';

import {
  createIntl,
  createIntlCache,
  RawIntlProvider,
  FormattedMessage,
} from 'react-intl';
import axios from 'axios';

import Lodable from "@loadable/component";
import Home from './app/components/Home';
import FAQDemo from "./app/components/FAQDemo";
import InterceptorRoute from "./InterceptorRoute";
import { getDefaultLang } from "./app/utils";

export function Loading() {
  return <div><FormattedMessage id="loading.message"/>...</div>
}

const getI18nMessages = async lang => {
  const url = `/assets/locales/${lang}.json`;
  const response = await axios.get(url);
  // console.log('data', response.data);
  return response.data;
};

const initialLocale = getDefaultLang() || 'en';

const languages = [
  {
    key: 'en',
    label: 'English',
  },
  {
    key: 'zh',
    label: 'Chinese',
  },
];

export const cache = createIntlCache();

/** You can use this variable in other files even after reassigning it. */
export let intl = createIntl(
  {locale: initialLocale, messages: ''},
  cache
)

export let fmt = intl.formatMessage;

const updateIntl = (locale, messages) => {
  intl = createIntl(
    {locale, messages},
    cache
  )
  fmt = intl.formatMessage;
  document.documentElement.lang = locale;
}

const lazyLoadComponent = component =>
  Lodable(() => component, {
    fallback: <Loading/>
  })

const createRoutesConfig = (locale) => {
  const routes = [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: '/demo',
      component: lazyLoadComponent(import('./app/components/Demo')),
      config: {
        url: `/react-faq/assets/data/${locale}/demo.json`,
        name: 'Demo'
      }
    },
    {
      path: '/demo2',
      component: lazyLoadComponent(import('./app/components/Demo2')),
      config: {
        url: `/react-faq/assets/data/${locale}/demo2.json`,
        name: 'Demo2'
      }
    },
  ];
  return routes;
}

function App() {

   // You could use redux to get the locale or get it from the url.
   const [state, setState] = useState({
    locale: initialLocale,
    messages: ''
  });
  const { locale, messages } = state;

  // first update
  useEffect(() => {
    (async () => {
      const messages = await getI18nMessages(initialLocale)
      updateIntl(initialLocale, messages);
      setState(state => ({
        ...state,
        locale: initialLocale,
        messages,
      }));
    })();
  }, []);

  const changeLanguage = async newLocale => {
    console.log('change language to', newLocale);
    const messages = await getI18nMessages(newLocale);
    updateIntl(newLocale, messages);
    setState({
      ...state,
      locale: newLocale,
      messages,
    });
  };

  const loadContext = async (url, component, path) => {
    const response = await axios.get(url);
    return response.data;
  }

  if(!messages) {
    return <div>Loading i18n...</div>;
  } else {
    return (
      <RawIntlProvider value={intl}>
        <div style={{ textAlign: 'right' }}>
          <select
            name="locale"
            id="locale"
            defaultValue={locale}
            onChange={event => changeLanguage(event.target.value)}>
            {languages.map(lang => (
              <option key={lang.key} value={lang.key}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div>

          <section>
            <div>
              <div>
                <h2><FormattedMessage id="home.welcome" values={{name: 'React.js'}} /></h2>
                <h3><FormattedMessage id="home.declarative" />
                  <button className="help-link" data-cp-help-dock data-cp-faq-id="67">?</button>
                </h3>
                <p><FormattedMessage id="home.declarative.p1" /></p>
              </div>
            </div>
          </section>

          <FAQDemo/>

          <hr/>
          <Router basename="/react-faq">
            <ul>
              <li>
                <Link to="/"><FormattedMessage id="home.link.home"/></Link>
              </li>
              <li>
                <Link to="/demo"><FormattedMessage id="home.link.demo"/></Link>
              </li>
              <li>
                <Link to="/demo2"><FormattedMessage id="home.link.demo2"/></Link>
              </li>
            </ul>

            <Switch>
              {createRoutesConfig(intl.locale).map(route => (
                  <InterceptorRoute
                    key={route.path}
                    {...route}
                    loadContext={loadContext}
                    loading={() => <Loading/> }
                   />
                )
              )}
            </Switch>
          </Router>
        </div>

    </RawIntlProvider>
    )
  }
}

export default App;
