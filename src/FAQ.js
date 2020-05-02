import React from 'react'
import classNames from 'classnames'

import styles from './styles.css'

function FAQ({ faq, onClick, isNode }) {
  const handleOnClick = (e, ...args) => {
    e.preventDefault()
    e.stopPropagation()
    onClick(...args)
  }

  const nestedFAQs = (faq.children || []).map((faq) => {
    return (
      <FAQ
        key={faq.id}
        faq={faq}
        onClick={onClick}
        isNode={isNode}
        type='child'
      />
    )
  })

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
          <span
            className={classNames({
              [`${styles.helpDockSprite} ${styles.cpHelpCategoryIcon} ${styles.cpHelpCategoryIconUp}`]:
                !isNode(faq) && faq.active,
              [`${styles.helpDockSprite} ${styles.cpHelpCategoryIcon} ${styles.cpHelpCategoryIconDown}`]:
                !isNode(faq) && !faq.active
            })}
          />
        </a>
      </div>

      {faq.active && faq.children && faq.children.length === 0 && 'No content'}

      {faq.active && <ul className={styles.cpHelpUl}>{nestedFAQs}</ul>}
    </li>
  )
}

export default FAQ
