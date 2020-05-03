import React, {useState, useEffect} from 'react';
import axios from "axios";

import ReactFAQ from 'react-faq';

function FAQDemo() {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

   // load data at first mount
   useEffect(() => {
    (async () => {
      setLoading(true);
      setTimeout(async () => {
        const data = await getFAQs();
        setData(data);
        setLoading(false);
      }, 1000);
    })();
  }, []);

  const getFAQs = async (url = '/react-faq/assets/data/en/faqs.json') => {
    const response = await axios.get(url);
    return response.data;
  }

  // const loadChildren = async (id) => {
  //   console.log('id', id);
  //   const url = '/react-faq/assets/data/en/faqs-children.json';
  //   return new Promise(async (resolve, reject) => {
  //     setTimeout(async () => {
  //       const children = await getFAQs(url);
  //       resolve(children);
  //     }, 0);
  //   });
  // }

  const loadContent = async (id) => {
    console.log('id', id);
    const url = '/react-faq/assets/data/en/faq-content.json';
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        const data = await getFAQs(url);
        resolve(data.content);
      }, 500);
    });
  }

  return (
    <ReactFAQ data={data} loadContent={loadContent} isLoading={isLoading}/>
  )

}

export default FAQDemo;
