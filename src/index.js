import React, { useState, useEffect, useRef } from 'react';
import FAQDock from './FAQDock';
import { FAQItem, FAQContent } from './FAQ';
import { useEventListener } from './hooks';
import { isNode, toggleActivity, findNodeById } from './utils';

import styles from './styles.module.css';

function FAQContainer({ data, title, isLoading, loadChildren, loadContent }) {
  let helpDockRef = useRef();
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState();
  const [isLoadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    setItems(data);
  }, [data]);

  useEventListener(document, 'click', (e) => {
    const { target } = e;
    const isHanlder = target.hasAttribute('data-cp-help-dock');

    if (isHanlder) {
      const cpFaqId = target.getAttribute('data-cp-faq-id');
      openHelpDock(+cpFaqId);
    }
  });

  const toggleNode = (id, active) => {
    const newItems = toggleActivity(id, items, active);
    setItems(newItems);
  };

  const activeItem = (id) => {
    toggleNode(id, true);
  };

  const lazyLoadPossibleContent = async (item) => {
    if (loadContent) {
      setCurrentItem({});
      setLoadingContent(true);
      const content = await loadContent(item.id);
      setLoadingContent(false);
      item = {
        ...item,
        content,
      };
    }
    setCurrentItem(item);
  };

  const openHelpDock = (id) => {
    helpDockRef.setState({ isVisible: true });
    const item = findNodeById(id, items);
    if (!item) {
      setCurrentItem({
        id: '0000',
        content: `<div style="text-align: center;">Can't find item.</div>`,
      });
    } else if (isNode(item)) {
      lazyLoadPossibleContent(item);
    } else {
      activeItem(id);
    }
  };

  const goBack = () => {
    setCurrentItem(null);
  };

  const handleOnClick = async (...args) => {
    const [item] = args;
    if (isNode(item)) {
      // node
      await lazyLoadPossibleContent(item);
    } else {
      // load children
      if (loadChildren) {
        const children = await loadChildren(item.id);
        item.children = children;
        setItems((preItems) => [...preItems]);
      }
      toggleNode(item.id);
    }
  };

  return (
    <FAQDock
      ref={(e) => (helpDockRef = e)}
      title={title}
      config={{
        isVisible: true,
      }}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : isNode(currentItem) ? (
        <FAQContent
          item={currentItem}
          goBack={goBack}
          isLoadingContent={isLoadingContent}
        />
      ) : items.length === 0 ? (
        <div>No Items</div>
      ) : (
        <ul className={styles.cpHelpUl}>
          {items.map((item) => {
            return (
              <FAQItem
                key={item.id}
                item={item}
                onClick={handleOnClick}
                isNode={isNode}
              />
            );
          })}
        </ul>
      )}
    </FAQDock>
  );
}

export default FAQContainer;
