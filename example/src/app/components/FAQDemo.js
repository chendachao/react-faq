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

  const getFAQs = async (url = '/assets/data/en/faqs.json') => {
    const response = await axios.get(url);
    return response.data;
  }

  const loadChildren = async (id) => {
    console.log('id', id);
    const url = '/assets/data/en/faqs-children.json';
    const children = await getFAQs(url);
    return children;
  }

  const loadContent = async (id) => {
    console.log('id', id);
    const url = '/assets/data/en/faq-content.json';
    const data = await getFAQs(url);
    return data.content;
  }

  return (
    <span>

      <div className="cp-help-container">
        <h3 className="cp-help-title">FAQ Dock</h3>
        <ul className="cp-help-ul">
          <li className="cp-help-list-item">
            <div className="cp-help-category-title">
              <a className="cp-help-category-text" href="#">text
                <span className="cp-help-category-icon cp-help-category-icon-up"></span>
              </a>
            </div>
            <ul className="cp-help-ul">
              <li className="cp-help-list-item">
                <div className="cp-help-category-title">
                  <a className="cp-help-category-text" href="#">sub text
                    <span className="cp-help-category-icon cp-help-category-icon-up"></span>
                  </a>
                </div>
              </li>
            </ul>
          </li>
          <li className="cp-help-list-item">
            <div className="cp-help-category-title">
              <a className="cp-help-category-text" href="#">text
                <span className="cp-help-category-icon cp-help-category-icon-up"></span>
              </a>
            </div>
            <ul className="cp-help-ul">
              <li className="cp-help-list-item">
                <div className="cp-help-category-title">
                  <a className="cp-help-category-text" href="#">sub text
                    <span className="cp-help-category-icon cp-help-category-icon-up"></span>
                  </a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <FAQContainer data={data} loadContent={loadContent}/>
    </span>
  )

}

export default FAQDemo;
