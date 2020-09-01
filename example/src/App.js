import React, { useState, useEffect }  from 'react';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Link,
} from 'react-router-dom';

import {
  RawIntlProvider,
  FormattedMessage,
} from 'react-intl';

import Lodable from "@loadable/component";
import Home from './app/pages/Home';
import FAQDemo from "./app/components/FAQDemo";
import InterceptorRoute from "./InterceptorRoute";
import { getDefaultLang, request } from "./app/utils";
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

const updateIntl = (locale = initialLocale, messages) => {
  generateIntl({locale, messages});
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

  const fetchI18nMessages = async (lang = initialLocale) => {
    const url = `/react-faq/assets/locales/${lang}.json`;
    let response;
    const cacheID = url;
    try {
      let temp = JSON.parse(localStorage.getItem(cacheID));
      if(temp && temp.expires > Date.now()) {
        return response = temp.data;
      }
      localStorage.removeItem(cacheID);
      response = await request(url);
      localStorage.setItem(cacheID, JSON.stringify({
        expires: Date.now() + 0.5 * 60 * 1000,
        data: response
      }));
      return response;
    } catch (error) {
      return response;
    }
  };

  const switchLocale = async newLocale => {
    setIsLoading18nMessages(true);
    const messages = await fetchI18nMessages(newLocale);
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
      await switchLocale(initialLocale);
    })();
  }, []);

  if(isLoading18nMessages) {
    return <div>Loading i18n...</div>;
  } else {
    return (
      <RawIntlProvider value={intl}>

        <div style={{ textAlign: 'right' }}>
          <select
            name="locale"
            id="locale"
            defaultValue={initialLocale}
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
