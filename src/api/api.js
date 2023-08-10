export const fireQueryByRadiusReq = async (
  selPlaces,
  setResults,
  centerLat,
  centerLng,
  radius
) => {
  const body = JSON.stringify({
    query: selPlaces,
    center_lat: centerLat,
    center_lng: centerLng,
    radius: radius,
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

  const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
  const data = await response.json();

  console.log(data);
  setResults(data.resp);
};
