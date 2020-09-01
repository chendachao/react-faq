
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
  const response = await axios.get(url);
  return response.data;
};

export {
  getDefaultLang,
  request
}
