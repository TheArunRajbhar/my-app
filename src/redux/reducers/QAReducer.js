import { ActionTypes } from "@/constants/constants";

const initialState = {
  pdfContent: null,
  isLoadingPostPdf: false,
  isLoadingStartChat: false,
};

const setLoadingState = (state, actionType) => {
  const loadingKey = `isLoading${actionType}`;
  return {
    ...state,
    [loadingKey]: true,
    isError: false,
    message: "",
  };
};

const setErrorState = (state, message) => ({
  ...state,
  isError: true,
  ...message,
  isLoadingPostPdf: false,
  isLoadingStartChat: false,
});

const QAReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ActionTypes.ADD_PDF + ActionTypes.LOADING:
    case ActionTypes.START_CHAT + ActionTypes.LOADING:
      console.log({ payload });
      return setLoadingState(state, payload);

    case ActionTypes.ADD_PDF + ActionTypes.FAILED:
    case ActionTypes.START_CHAT + ActionTypes.FAILED:
      return setErrorState(state, payload);

    case ActionTypes.ADD_PDF:
      return {
        ...state,
        pdfContent: payload,
        isLoadingPostPdf: false,
      };

    case ActionTypes.START_CHAT:
      return {
        ...state,
        pdfContent: payload,
        isLoadingStartChat: false,
      };

    default:
      return state;
  }
};

export default QAReducer;
