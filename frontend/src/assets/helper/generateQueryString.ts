import queryString from 'query-string';

const generateQueryString = (obj: object): string => {
  const notNullAttrObj = Object.fromEntries(Object.entries(obj).filter(([k, v]) => v && k !== 'url'));
  return queryString.stringify(notNullAttrObj);
};

export default generateQueryString;
