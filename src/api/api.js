export const fireQueryByRadiusReq = async (
  selPlaces,
  setResults,
  centerLat,
  centerLng,
  radius,
  setIsLoadingResult,
  numResultToReturn,
  noOverlap,
  allowDuplicates
) => {
  setIsLoadingResult(true);
  const body = JSON.stringify({
    query: selPlaces,
    center_lat: centerLat,
    center_lng: centerLng,
    radius: radius,
    no_overlap: noOverlap,
    result_set_size: numResultToReturn,
    algo_to_use: 2,
    build_exhaustive_index: false,
    allow_duplicates: allowDuplicates,
  });

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  };
  setResults(null);

  try {
    const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
    const data = await response.json();
    setResults(data.resp);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoadingResult(false);
  }
};
