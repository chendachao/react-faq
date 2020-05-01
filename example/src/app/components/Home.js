import React from 'react';
import { FormattedMessage } from "react-intl";
import { fmt } from "../../App";

function Home() {
  return (
    <div>
      <h2><FormattedMessage id="home.title" /></h2>
      <p>{fmt({id: "home.declarative.p1"})}</p>
    </div>
  );
}

export default Home;
