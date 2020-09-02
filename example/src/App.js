import React, { useState, useEffect }  from 'react';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Link,
} from 'react-router-dom';

import {
  IntlProvider,
  FormattedMessage,
} from 'react-intl';

import Lodable from "@loadable/component";
import Home from './app/pages/Home';
import FAQDemo from "./app/components/FAQDemo";
import RouteInterceptor from "./app/utils/routeInterceptor";
import { getDefaultLang, request, withCacheFetch } from "./app/utils";

import './App.css';

export function Loading() {
  return <div><FormattedMessage id="message.loading"/></div>
}

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

  const [locale, setLocale] = useState(initialLocale);
  const [msg, setMsg] = useState('');

  const fetchTranslation = async (lang = initialLocale) => {
    const url = `/react-faq/assets/locales/${lang}.json`;
    let response = await withCacheFetch(request, url);
    return response;
  };

  const switchLocale = async newLocale => {
    const messages = await fetchTranslation(newLocale);
    setLocale(newLocale);
    setMsg(messages);
    document.documentElement.lang = locale;
  };

  const loadContext = async (url, component, path) => {
    const response = await request(url);
    return response;
  }

  // first update
  useEffect(() => {
    (async () => {
      const messages = await fetchTranslation();
      setMsg(messages);
    })();
  }, []);

  if(!msg) {
    return <div>Loading i18n...</div>;
  } else {
    return (
      // <RawIntlProvider value={intl} locale="en" defaultLocale="en-US">
      <IntlProvider locale={locale} defaultLocale="en-US" messages={msg}>

        <div style={{ textAlign: 'right' }}>
          <select
            name="locale"
            id="locale"
            value={locale}
            onChange={event => switchLocale(event.target.value)}>
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
              {createRoutesConfig(locale).map(route => (
                <RouteInterceptor
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

    </IntlProvider>
    // </RawIntlProvider>
    )
  }
}

export default App;
