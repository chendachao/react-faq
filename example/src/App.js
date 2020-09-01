import React, { useState, useEffect }  from 'react';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Link,
} from 'react-router-dom';

import {
  IntlProvider,
  RawIntlProvider,
  FormattedMessage,
} from 'react-intl';

import Lodable from "@loadable/component";
import Home from './app/pages/Home';
import FAQDemo from "./app/components/FAQDemo";
import RouteInterceptor from "./app/utils/routeInterceptor";
import { getDefaultLang, request, withCacheFetch } from "./app/utils";
import { generateIntl, intl } from "./intl";

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

const updateIntl = (locale = initialLocale, messages = '') => {
  generateIntl({locale, messages,
    onError: (err) => {
      if (err.code === "MISSING_TRANSLATION") {
        console.warn("Missing translation", err.message);
        return;
      }
      // throw err;
      console.warn(err);
    }
  });
  document.documentElement.lang = locale;
}

updateIntl();

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

  const [isLoading18nMessages, setIsLoading18nMessages] = useState(false);
  const [locale, setLocale] = useState(initialLocale);

  const fetchTranslation = async (lang = initialLocale) => {
    const url = `/react-faq/assets/locales/${lang}.json`;
    let response = await withCacheFetch(request, url);
    return response;
  };

  const switchLocale = async newLocale => {
    setIsLoading18nMessages(true);
    setLocale(newLocale);
    const messages = await fetchTranslation(newLocale);
    updateIntl(newLocale, messages);
    setIsLoading18nMessages(false);
  };

  const loadContext = async (url, component, path) => {
    const response = await request(url);
    return response;
  }

  // first update
  useEffect(() => {
    (async () => {
      setIsLoading18nMessages(true);
      const messages = await fetchTranslation();
      updateIntl('', messages);
      setIsLoading18nMessages(false);
    })();
  }, []);

  if(!intl.messages) {
    return <div>Loading i18n...</div>;
  } else {
    return (
      <RawIntlProvider value={intl} locale="en" defaultLocale="en-US">

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
              {createRoutesConfig(intl.locale).map(route => (
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

    </RawIntlProvider>
    )
  }
}

export default App;
