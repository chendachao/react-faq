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

import Lodable from "@loadable/component";
import Home from './app/pages/Home';
import FAQDemo from "./app/components/FAQDemo";
import InterceptorRoute from "./InterceptorRoute";
import { getDefaultLang, request } from "./app/utils";

import './App.css';

export function Loading() {
  return <div><FormattedMessage id="loading.message"/>...</div>
}

const getI18nMessages = async lang => {
  const url = `/react-faq/assets/locales/${lang}.json`;
  const response = await request(url);
  return response;
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

const updateIntl = (locale, messages) => {
  intl = createIntl(
    {locale, messages},
    cache
  )
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
      path: '/page1',
      component: lazyLoadComponent(import('./app/pages/Page1')),
      config: {
        url: `/react-faq/assets/data/${locale}/page1.json`,
        name: 'Page1'
      }
    },
    {
      path: '/page2',
      component: lazyLoadComponent(import('./app/pages/Page2')),
      config: {
        url: `/react-faq/assets/data/${locale}/page2.json`,
        name: 'Page2'
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
    const response = await request(url);
    return response;
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
              </div>
            </div>
          </section>

          <hr/>
          <Router>
            <ul>
              <li>
                <Link to="/"><FormattedMessage id="home.link.home"/></Link>
              </li>
              <li>
                <Link to="/page1"><FormattedMessage id="home.link.page1"/></Link>
              </li>
              <li>
                <Link to="/page2"><FormattedMessage id="home.link.page2"/></Link>
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

        <FAQDemo/>

    </RawIntlProvider>
    )
  }
}

export default App;
