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
      `${process.env.REACT_APP_API_URL}/query`,
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
  setPrependPrevMsg,
  setResults
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

    // catch final state
    const specialString =
      "Hang on tight! I'm doing some quick maths to find the best match!";
    if (data.message.endsWith(specialString)) {
      setChatId(''); // allow chat id to renew
      triggerChatSearch(
        data.chat_id,
        setChatRecords,
        setResults,
        setIsLoadingResult
      );
      setChatRecords(prev =>
        prev.concat(
          { from: 'bot', message: 'processing GIF' },
          { from: 'bot', message: '* Gerald Bot is hard at work *' }
        )
      );
    } else {
      setIsLoadingResult(false);
    }
  } catch (error) {
    console.log(error);
    setIsLoadingResult(false);
  }
};

const triggerChatSearch = async (
  chatId,
  setChatRecords,
  setResults,
  setIsLoadingResult
) => {
  setIsLoadingResult(true);
  const body = JSON.stringify({
    chat_id: chatId,
  });

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/chat-search`,
      requestOptions
    );
    const data = await response.json();
    const msg =
      data.resp.length > 1
        ? `Here are the top ${data.resp.length} results I found! Woohoo! Hope you are happy with them! Otherwise, feel free to continue talking with me and we can try something else!`
        : data.resp.length === 1
        ? `Phew, I managed to find one result. Hopefully, it's to your liking! Otherwise, feel free to continue talking with me and we can try something else!`
        : 'I did not manage to find anything... sorry about that! You can always try again with a different example or a search area to look within. :)';
    setChatRecords(prev =>
      prev.concat({
        from: 'bot',
        message: msg,
      })
    );
    setResults(data.resp);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoadingResult(false);
  }
};
