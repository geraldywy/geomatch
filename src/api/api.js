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
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/query-by-radius`,
      requestOptions
    );
    const data = await response.json();
    setResults(data.resp);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoadingResult(false);
  }
};

export const fireChatReq = async (
  message,
  setChatRecords,
  setIsLoadingResult,
  chatId,
  setChatId,
  modelToUse,
  setModelToUse,
  promptToUse,
  setPromptToUse,
  prependPrevMsg,
  setPrependPrevMsg
) => {
  setIsLoadingResult(true);
  const body = JSON.stringify({
    chat_id: chatId,
    message: message,
    model_to_use: modelToUse,
    prompt_to_use: promptToUse,
    prepend_prev_message: prependPrevMsg,
  });

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/chat-request`,
      requestOptions
    );
    const data = await response.json();
    setChatId(data.chat_id);
    setChatRecords(prev => prev.concat({ from: 'bot', message: data.message }));
    setModelToUse(data.next_model_to_use);
    setPromptToUse(data.next_prompt_to_use);
    setPrependPrevMsg(data.next_prepend_prev_message);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoadingResult(false);
  }
};
