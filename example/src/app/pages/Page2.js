import React from 'react';

function Page2(props) {
  const {context: page, locationChanged} = props;

  if(locationChanged) {
    console.log('locationChanged cool');
  }

  return (
    <div>
      <h2>{page.text}</h2>
    </div>
  );
}

export default Page2;
