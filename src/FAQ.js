import React from 'react';
import marked from 'marked';

import styles from './styles.module.css';

export function FAQItem({ item, onClick, isNode }) {
  const handleOnClick = (e, ...args) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(...args);
  };

  const nestedItems = (item.children || []).map((item) => {
    return (
      <FAQItem
        key={item.id}
        item={item}
        onClick={onClick}
        isNode={isNode}
        type='child'
      />
    );
  });

  return (
    <li className={styles.cpHelpListItem}>
      <div className={styles.cpHelpCategoryTitle}>
        <a
          href='#'
          className={styles.cpHelpCategoryText}
          onClick={(e) => handleOnClick(e, item)}
        >
          {item.label}
          <span>
            {!isNode(item) && item.active && (
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
            {!isNode(item) && !item.active && (
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

      {item.active && <ul className={styles.cpHelpUl}>{nestedItems}</ul>}

      {item.active &&
        item.children &&
        item.children.length === 0 &&
        'No content'}
    </li>
  );
}

export function FAQContent({ item, isLoadingContent, goBack }) {
  return (
    <div>
      <div className={styles.cpHelpGoBack} onClick={goBack}>
        <svg
          className={styles.cpHelpGoBackArrow}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 448 512'
        >
          <path d='M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z' />
        </svg>
        <span className={styles.cpHelpGoBackText}>Go back</span>
      </div>
      {!isLoadingContent && !item.children && !item.content && 'No content'}
      {isLoadingContent ? (
        <div>Loading...</div>
      ) : (
        item.content && (
          <div
            style={{ marginBottom: '10px' }}
            dangerouslySetInnerHTML={{ __html: marked.parse(item.content) }}
          />
        )
      )}
    </div>
  );
}
