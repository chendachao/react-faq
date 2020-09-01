import React from 'react';
import { useIntl, FormattedMessage } from "react-intl";

function Home() {
  const intl = useIntl();
  return (
    <div>
      <h2><FormattedMessage id="home.title" /></h2>
      <p>{intl.formatMessage({id: "home.declarative.p1"})}</p>
    </div>
  );
}

export default Home;
