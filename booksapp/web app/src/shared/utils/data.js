export const getDataFromWindowOrContext = (name=null, staticContext, defaultValue=[]) => {
  let _data = defaultValue;
  if (__isBrowser__) {
    // console.log(window.__INITIAL_DATA__)
    _data = window.__INITIAL_DATA__ || defaultValue;
    delete window.__INITIAL_DATA__;
  } else {
    _data = staticContext.data || defaultValue;
  }
  return _data;
};