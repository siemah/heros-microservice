export const getDataFromWindowOrContext = (name=null, staticContext, defaultValue=[]) => {
  let _data = defaultValue;
  if (__isBrowser__) {
    // console.log(window.__INITIAL_DATA__)
    _data = window.__INITIAL_DATA__ || [];
    delete window.__INITIAL_DATA__;
  } else {
    _data = staticContext.data || [];
  }
  return _data;
};