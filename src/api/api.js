export const fireSendQuery = async (selPlaces, setResults) => {
  const body = JSON.stringify({
    query: selPlaces,
    country: 'SG',
    no_overlap: false,
    result_set_size: 5,
    algo_to_use: 2,
    build_exhaustive_index: false,
  });
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  };

  console.log(process.env.REACT_APP_API_URL, body);
  const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
  const data = await response.json();

  console.log(data);
  setResults(data.resp);
};
