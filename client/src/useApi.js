import { useState } from "react";
import axios from "axios";

export const usePostValue = (url, initial = null) => {
  const [data, setData] = useState({
    value: initial,
    loading: false,
  });

  const doLoad = async (args) => {
    setData({
      value: data,
      loading: true,
    });
    const res = await axios.post(url, args);

    setData({
      value: res.data,
      loading: false,
    });
  };

  return [data.value, doLoad, data.loading];
};
