import React, {useState, useEffect} from 'react';
import axios from "axios";

import {FAQContainer} from 'react-faq';

function FAQDemo() {

  const [data, setData] = useState([]);

   // load data at first mount
   useEffect(() => {
    (async () => {
      setTimeout(async () => {
        const data = await getFAQs();
        setData(data);
      }, 2000);
    })();
  }, []);

  const getFAQs = async (url = './assets/data/en/faqs.json') => {
    const response = await axios.get(url);
    return response.data;
  }

  const loadChildren = async (id) => {
    console.log('id', id);
    const url = './assets/data/en/faqs-children.json';
    const children = await getFAQs(url);
    return children;
  }

  const loadContent = async (id) => {
    console.log('id', id);
    const url = './assets/data/en/faq-content.json';
    const data = await getFAQs(url);
    return data.content;
  }

  return (
    <FAQContainer data={data} loadContent={loadContent}/>
  )

}

export default FAQDemo;
