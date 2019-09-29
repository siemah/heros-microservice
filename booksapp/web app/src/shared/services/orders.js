import endpoints from "../config/endpoints";

/**
 * send a requst to create new order
 * @param {object} order contain book id 
 * @param {string} token loggedin user jwt
 */
export const postOrder = async (order, token) => {
  try {
    let res = await fetch(
      endpoints.order, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify(order),
      });
    await res.json();
  } catch (error) {
    throw new Error('Something went wrong');
  }
}

export const fetchOrders = async (location, opts={}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _res = await fetch(endpoints.orders, opts);
      let _data = await _res.json();
      resolve(_data)
    } catch (error) {
      reject([]);
    }
  });
}