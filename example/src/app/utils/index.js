
import axios from 'axios';

const getDefaultLang = () => {
  let lang = window.navigator.languages
    ? window.navigator.languages[0]
    : null;
  lang =
    lang ||
    window.navigator.language ||
    window.navigator.browserLanguage ||
    window.navigator.userLanguage;

  let shortLang = lang;
  if (shortLang.indexOf('-') !== -1) shortLang = shortLang.split('-')[0];

  if (shortLang.indexOf('_') !== -1) shortLang = shortLang.split('_')[0];

  console.log(lang, shortLang);
  return shortLang;
};

const request = async (url, options) => {
  const response = await axios.get(url, options);
  return response.data;
};

// network first
const withCacheFetch = async (fn, url, args) => {
  let response;
  const cacheID = url;
  try {
    let temp = JSON.parse(localStorage.getItem(cacheID));
    if(temp && temp.expires > Date.now()) {
      response = temp.data;
    }
    const remoteResponse = await fn(url, args);
    if(remoteResponse) {
      localStorage.setItem(cacheID, JSON.stringify({
        expires: Date.now() + 0.5 * 60 * 1000,
        data: response
      }));
      response = remoteResponse;
    }
    return response;
  } catch (error) {
    return response;
  }
}

export {
  getDefaultLang,
  request,
  withCacheFetch
}
