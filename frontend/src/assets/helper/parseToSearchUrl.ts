const parseToSearchUrl = (params: object): string => {
  const searchUrl = new URLSearchParams();
  for (const key in params) {
    if (params[key as keyof typeof params] !== '' && params[key as keyof typeof params] !== null) {
      searchUrl.append(key, params[key as keyof typeof params]);
    }
  }
  return searchUrl.toString();
};
export default parseToSearchUrl;
