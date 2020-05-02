import React from 'react'
import FAQ from './FAQ'

import styles from './styles.css'

function FAQList({ data = [], onClick, isNode }) {
  return (
    <ul className={styles.cpHelpUl}>
      {data.map((faq) => {
        return <FAQ key={faq.id} faq={faq} onClick={onClick} isNode={isNode} />
      })}
    </ul>
  )
}

export default FAQList
