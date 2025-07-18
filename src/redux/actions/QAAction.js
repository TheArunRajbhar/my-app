import axios from "axios";
import { ActionTypes, appUrl } from "@/constants/constants";

export const postPdf = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.ADD_PDF + ActionTypes.LOADING,
      payload: "PostPdf",
    });

    const res = await axios.post(appUrl, data, {
      headers: { "X-Type": "upload-pdf" },
    });
    dispatch({
      type: ActionTypes.ADD_PDF,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    dispatch({
      type: ActionTypes.ADD_PDF + ActionTypes.FAILED,
      payload: err?.response?.data || "Error from uploading doc.",
    });
  }
};

export const startChat = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.START_CHAT + ActionTypes.LOADING,
      payload: "StartChat",
    });

    const res = await axios.post(appUrl, data, {
      headers: {
        "Content-Type": "application/json",
        "X-Type": "chat",
      },
    });
   
    dispatch({
      type: ActionTypes.START_CHAT,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    dispatch({
      type: ActionTypes.START_CHAT + ActionTypes.FAILED,
      payload: err?.response?.data || "Error from chat.",
    });
  }
};
