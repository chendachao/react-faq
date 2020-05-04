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
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 492 492'
          xmlSpace='preserve'
        >
          <g>
            <g>
              <path
                d='M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z'
              />
            </g>
          </g>
        </svg>
        <span className={styles.cpHelpGoBackText}>Go Back</span>
      </div>
      {!isLoadingContent && !item.children && !item.content && 'No content'}
      {isLoadingContent ? (
        <div>Loading Content...</div>
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
