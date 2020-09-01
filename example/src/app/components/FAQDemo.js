import React from 'react';

import ReactFAQ from 'react-faq';
import 'react-faq/dist/index.css';

import { useFetch } from "../hooks/useFetch";
import { request } from "../utils";

function FAQDemo() {
  // load data at first mount
  const [data, isLoading] = useFetch({
    url: '/react-faq/assets/data/en/faqs.json'
  });

  const loadContent = async (id) => {
    console.log('id', id);
    const url = '/react-faq/assets/data/en/faq-content.json';
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        const data = await request(url);
        resolve(data.content);
      }, 500);
    });
  };

  return (
    <ReactFAQ
      data={data}
      isLoading={isLoading}
      loadContent={loadContent}
    />
  );
}

export default FAQDemo;
