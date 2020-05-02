import React, {useEffect, useState} from 'react';
import { Route, useLocation } from 'react-router-dom';

function InterceptorRoute({loadContext, loading, ...route}) {

  const location = useLocation();
  const [context, setContext] = useState();

  const [locationChanged, setLocationChange] = useState(false);

  useEffect(() => {
    console.log('location changed to', location.pathname);
    (async () => {
      // setTimeout(async () => {
        const {config} = route;
        if (config) {
          const {url, name} = config;
          if(loadContext) {
            const data = await loadContext(url, name, location.pathname);
            setContext({
              context: data
            });
          }
        }
      // }, 1000);

      setLocationChange(false);
      setTimeout(() => {
        setLocationChange(true);
      }, 1000);

    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div>
      <Route
          path={route.path}
          exact={route.exact}
          render={props => {
            if(route.config && !context) {
              return loading();
            }
            return (
              <route.component {...props} {...context}
                routes={route.routes}
                locationChanged={locationChanged}/>
            )
          }}
      />
    </div>
  )
}

export default InterceptorRoute;
