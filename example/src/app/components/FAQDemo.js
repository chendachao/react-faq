import React from 'react';

import ReactFAQ from 'react-faq';
import 'react-faq/dist/index.css';

import { useFetch } from "../hooks/useFetch";

function FAQDemo() {
  // load data at first mount
  const [data = [], isLoading, fetchData] = useFetch({
    url: '/react-faq/assets/data/en/faqs.json'
  });

  const loadContent = async (id) => {
    console.log('id', id);
    const url = '/react-faq/assets/data/en/faq-content.json';
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        const data = await fetchData(url);
        resolve(data && data.content);
      }, 500);
    });
  };

  return (
    <ReactFAQ
      title="FAQs"
      data={data}
      isLoading={isLoading}
      loadContent={loadContent}
    />
  );
}

export default FAQDemo;
