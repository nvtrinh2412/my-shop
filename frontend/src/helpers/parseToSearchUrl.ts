import filterParams from '@models/filterParams';

const parseToSearchUrl = (params: filterParams): string => {
  const searchUrl = new URLSearchParams();

  for (const key in params) {
    if (params[key]) {
      searchUrl.append(key, params[key]);
    }
  }

  return searchUrl.toString();
};
export default parseToSearchUrl;
