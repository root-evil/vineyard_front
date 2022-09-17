import axios from "axios";
import { Buffer } from "buffer";
import { is } from "../../helpers/is";
import errors from "../modules/errors";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const all = (promises) => axios.all(promises);

export const get = (
  url,
  params,
  responseType,
  customHeaders,
  cancelToken,
  setCancelToken
) => {
  if (cancelToken) {
    cancelToken.cancel();
  }

  const source = axios.CancelToken.source();

  if (setCancelToken) {
    setCancelToken(source);
  }

  if (!customHeaders) {
    customHeaders = {};
  }

  if (!customHeaders?.Accept) {
    customHeaders.Accept = "application/json";
  }

  return axios.get(url, {
    cancelToken: source.token,
    headers: { ...customHeaders },
    params,
    responseType: responseType,
    data: {},
  });
};

export const post = (url, payload, customHeaders, responseType) => {
  if (!customHeaders) {
    customHeaders = {};
  }

  if (!customHeaders["Accept"]) {
    customHeaders["Accept"] = "application/json";
  }

  return axios.post(url, payload, {
    headers: { ...customHeaders },
    responseType,
  });
};

export const put = (url, payload) => axios.put(url, payload);

export const patch = (url, payload) => axios.patch(url, payload);

export const del = (url, payload) => axios.delete(url, { data: payload });

export const showError = (err) => {
  const data = err?.response?.data;

  if (err?.response?.data?.code === 100) {
    return;
  }

  if (
    (err?.response?.status >= 500 &&
      err?.response?.data?.code !== 4010 &&
      err?.response?.data?.code !== 4011 &&
      err?.response?.data?.code !== 4012) ||
    err?.toString()?.includes("Network Error")
  ) {
    errors.error = {
      ...data,
      code: data?.status,
      description: err?.toString(),
    };
  } else if (err?.response?.status === 403) {
    errors.error = { code: 403 };
  } else if (is(ArrayBuffer, data)) {
    const res = {
      description: Buffer.from(err.response.data).toString("utf8"),
    };
    errors.error = res;
  } else if (data && data?.code !== 4010) {
    errors.error = {
      ...data,
      code: data?.code,
      message: data?.message,
    };
  }
};
