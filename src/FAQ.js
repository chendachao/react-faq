import React from 'react';
import styles from './styles.module.css';

function FAQ({ faq, onClick, isNode }) {
  const handleOnClick = (e, ...args) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(...args);
  };

  const nestedFAQs = (faq.children || []).map((faq) => {
    return (
      <FAQ
        key={faq.id}
        faq={faq}
        onClick={onClick}
        isNode={isNode}
        type='child'
      />
    );
  });

  // v^
  return (
    // <li style={{marginLeft: "25px", marginTop: "10px"}}>
    <li className={styles.cpHelpListItem}>
      <div className={styles.cpHelpCategoryTitle}>
        <a
          href='#'
          className={styles.cpHelpCategoryText}
          onClick={(e) => handleOnClick(e, faq)}
        >
          {faq.label} {faq.id}
          <span>
            {!isNode(faq) && faq.active && (
              <svg
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 451.847 451.846'
                className={styles.cpHelpCategoryIcon}
              >
                <path
                  d='M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0
                L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4
                c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z'
                />
              </svg>
            )}
            {!isNode(faq) && !faq.active && (
              <svg
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 451.847 451.847'
                className={styles.cpHelpCategoryIcon}
              >
                <path
                  d='M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
    c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
    c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z'
                />
              </svg>
            )}
          </span>
        </a>
      </div>

      {faq.active && faq.children && faq.children.length === 0 && 'No content'}

      {faq.active && <ul className={styles.cpHelpUl}>{nestedFAQs}</ul>}
    </li>
  );
}

export default FAQ;
