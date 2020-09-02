import React, { useState, useEffect } from 'react';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import { IntlProvider, FormattedMessage } from 'react-intl';

import Lodable from '@loadable/component';
import Home from './app/pages/Home';
import FAQDemo from './app/components/FAQDemo';
// import RouteInterceptor from "./app/utils/routeInterceptor";
import { getDefaultLang, request, withCacheFetch } from './app/utils';
import withStaticContext from './app/hoc/withStaticContext';

import './App.css';

export function Loading() {
  return (
    <div>
      <FormattedMessage id='message.loading' />
    </div>
  );
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

const lazyLoadComponent = (component) =>
  Lodable(() => component, {
    fallback: <Loading />,
  });

const createRoutes = (locale) => {
  const routes = [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: '/page1',
      // component: lazyLoadComponent(import('./app/pages/Page1')),
      // config: {
      //   url: `/react-faq/assets/data/${locale}/page1.json`,
      //   name: 'Page1'
      // }
      component: withStaticContext(
        lazyLoadComponent(import('./app/pages/Page1')),
        {
          url: `/react-faq/assets/data/${locale}/page1.json`,
          name: 'Page1',
          fallback: <Loading />,
        }
      ),
    },
    {
      path: '/page2',
      // component: lazyLoadComponent(import('./app/pages/Page2')),
      // config: {
      //   url: `/react-faq/assets/data/${locale}/page2.json`,
      //   name: 'Page2'
      // },
      component: withStaticContext(
        lazyLoadComponent(import('./app/pages/Page2')),
        {
          url: `/react-faq/assets/data/${locale}/page2.json`,
          name: 'Page2',
          fallback: <Loading />,
        }
      ),
    },
  ];
  return routes;
};

function App() {
  const [locale, setLocale] = useState(initialLocale);
  const [messages, setMessages] = useState('');

  const fetchTranslation = async (lang = initialLocale) => {
    const url = `/react-faq/assets/locales/${lang}.json`;
    let response = await withCacheFetch(request, url);
    return response;
  };

  const switchLocale = async (newLocale) => {
    const msg = await fetchTranslation(newLocale);
    setLocale(newLocale);
    setMessages(msg);
    document.documentElement.lang = locale;
  };

  // first update
  useEffect(() => {
    (async () => {
      const msg = await fetchTranslation();
      setMessages(msg);
    })();
  }, []);

  if (!messages) {
    return <div>Loading i18n...</div>;
  } else {
    return (
      // <RawIntlProvider value={intl} locale="en" defaultLocale="en-US">
      <IntlProvider locale={locale} defaultLocale='en-US' messages={messages}>
        <div style={{ textAlign: 'right' }}>
          <select
            name='locale'
            id='locale'
            value={locale}
            onChange={(event) => switchLocale(event.target.value)}
          >
            {languages.map((lang) => (
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
                <h2>
                  <FormattedMessage
                    id='home.welcome'
                    values={{ name: 'React.js' }}
                  />
                </h2>
                <h3>
                  <FormattedMessage id='home.declarative' />
                  <button
                    className='help-link'
                    data-cp-help-dock
                    data-cp-faq-id='67'
                  >
                    ?
                  </button>
                </h3>
              </div>
            </div>
          </section>

          <hr />
          <Router>
            <ul>
              <li>
                <Link to='/'>
                  <FormattedMessage id='home.link.home' />
                </Link>
              </li>
              <li>
                <Link to='/page1'>
                  <FormattedMessage id='home.link.page1' />
                </Link>
              </li>
              <li>
                <Link to='/page2'>
                  <FormattedMessage id='home.link.page2' />
                </Link>
              </li>
            </ul>

            <Switch>
              {/* {createRoutesConfig(locale).map(route => (
                <RouteInterceptor
                  key={route.path}
                  {...route}
                  loadContext={loadContext}
                  loading={() => <Loading/> }
                  />
                )
              )} */}

              {createRoutes(locale).map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => <route.component {...props} />}
                />
              ))}
            </Switch>
          </Router>
        </div>

        <FAQDemo />
      </IntlProvider>
      // </RawIntlProvider>
    );
  }
}

export default App;
