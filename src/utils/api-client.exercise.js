function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  };
  const url =`${process.env.REACT_APP_API_URL}/${endpoint}`;
  return window.fetch(url, config).then(async r => {
    const data = await r.json();
    if (r.ok) return data;
    return Promise.reject(data);
  });
}

export {client}
