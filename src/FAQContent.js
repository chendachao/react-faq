import React from 'react';
import marked from 'marked';

import styles from './styles.scss';

function FAQContent({faq, isLoadingContent, goBack}) {
  return (
    <div>
      <div className={styles.cpHelpGoBack} onClick={goBack}>
        <span className={styles.cpHelpGoBackArrow + ' ' + styles.helpDockSprite}></span>
        <span className={styles.cpHelpGoBackText}>
          Go back
        </span>
      </div>
      {
        !isLoadingContent && !faq.children && !faq.content && "No content"
      }
      {
        isLoadingContent ? <div>Loading...</div>
        : faq.content && <div style={{marginBottom: "10px"}} dangerouslySetInnerHTML={{__html: marked.parse(faq.content)}}></div>
      }
    </div>
  )
}



export default FAQContent;

