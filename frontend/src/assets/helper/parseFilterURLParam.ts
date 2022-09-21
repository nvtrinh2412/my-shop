const parseFilterURLParams = (search: URLSearchParams): any => {
  const params = new URLSearchParams(search);
  const name = params.get('name');
  const category = params.get('category');
  const designer = params.get('designer');
  const key = params.get('key');
  const order = params.get('order');
  return {
    name,
    category,
    designer,
    key,
    order,
  };
};

export default parseFilterURLParams;
