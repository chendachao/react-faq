import React from 'react';
import FAQ from "./FAQ";

import styles from './styles.scss';

function FAQList({data = [], onClick, isNode}) {
  return (
    <ul className={styles.cpHelpUl}>
      {
        data.map(faq => {
          return (
            <FAQ key={faq.id} faq={faq} onClick={onClick} isNode={isNode}/>
          )
        })
      }
    </ul>
  )

}

export default FAQList;

