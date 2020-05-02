import React, { useState, useEffect, useRef } from 'react'
import FAQDock from './FAQDock'
import FAQList from './FAQList'
import FAQContent from './FAQContent'
import { useEventListener } from './hooks'

import styles from './styles.css'

function FAQContainer({ data, title, loadChildren, loadContent }) {
  let helpDockRef = useRef()
  const [faqs, setFaqs] = useState([])
  const [currentNode, setCurrentNode] = useState()
  const [isLoadingContent, setIsLoadingContent] = useState(false)

  useEffect(() => {
    setFaqs(data)
  }, [data])

  useEventListener(document, 'click', (e) => {
    const { target } = e

    // const isHanlder = target.classList.contains('cp-help') && target.classList.contains('cp-help-link');;
    const isHanlder = target.hasAttribute('data-cp-help-dock')

    if (isHanlder) {
      const cpFaqId = target.getAttribute('data-cp-faq-id')
      openHelpDock(+cpFaqId)
    }
  })

  const isNode = (faq) => {
    return faq && !faq.children
  }

  const hasActiveNode = (children) => {
    return children.some((child) => {
      if (isNode(child)) {
        return child.active === true
      } else {
        return hasActiveNode(child.children)
      }
    })
  }

  // active/deactive item recursively
  const toggleActivity = (id, items, active /*default*/) => {
    return items.reduce((acc, item) => {
      let newItem = item
      if (item.id === id) {
        newItem = {
          ...item,
          active: !item.active || active
        }
      } else if (item.children) {
        item.children = toggleActivity(id, item.children, active)
        const canActive = hasActiveNode(item.children)
        canActive && (item.active = canActive)
      }
      acc.push(newItem)
      return acc
    }, [])
  }

  const findNodeById = (id, nodes) => {
    const tempArr = [...nodes]
    while (tempArr.length > 0) {
      const item = tempArr.shift()
      if (item.id === id) {
        return item
      } else if (item.children) {
        tempArr.push(...item.children)
      }
    }
    return null
  }

  const toggleNode = (id, active) => {
    const newFAQs = toggleActivity(id, faqs, active)
    setFaqs(newFAQs)
  }

  const activeItem = (id) => {
    toggleNode(id, true)
  }

  const lazyLoadPossibleContent = async (item) => {
    if (loadContent) {
      setIsLoadingContent(true)
      const content = await loadContent(item.id)
      setIsLoadingContent(false)
      item = {
        ...item,
        content
      }
    }
    return item
  }

  const openHelpDock = async (id) => {
    helpDockRef.setState({ isVisible: true })
    const item = findNodeById(id, faqs)
    if (!item) {
      setCurrentNode({
        id: '0000',
        content: `<div style="text-align: center;">Can't find item.</div>`
      })
    } else if (isNode(item)) {
      let newFaq = await lazyLoadPossibleContent(item)
      setCurrentNode(newFaq)
    } else {
      activeItem(id)
    }
  }

  const goBack = () => {
    setCurrentNode(null)
  }

  const handleOnClick = async (...args) => {
    const [faq] = args
    if (!faq.children) {
      // node
      let newFaq = await lazyLoadPossibleContent(faq)
      setCurrentNode(newFaq)
    } else {
      // load children
      if (loadChildren) {
        const children = await loadChildren(faq.id)
        console.log('children', children)
        faq.children = children
        setFaqs((preFAQs) => [...preFAQs])
      }
      toggleNode(faq.id)
    }
  }

  return (
    <FAQDock ref={(e) => (helpDockRef = e)} isVisible={true}>
      <div className={styles.cpHelpContainer}>
        <h3 className={styles.cpHelpTitle}>{title || 'FAQ Dock'}</h3>
        {isNode(currentNode) ? (
          <FAQContent
            faq={currentNode}
            goBack={goBack}
            isLoadingContent={isLoadingContent}
          />
        ) : faqs.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <FAQList data={faqs} onClick={handleOnClick} isNode={isNode} />
        )}
      </div>
    </FAQDock>
  )
}

export default FAQContainer
