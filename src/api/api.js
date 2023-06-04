export const fireSendQuery = async (selPlaces, setResult) => {
  const body = JSON.stringify({ query: selPlaces });
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  };

  console.log(process.env.REACT_APP_API_URL, body);
  const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
  const data = await response.json();

  console.log(data);
};
