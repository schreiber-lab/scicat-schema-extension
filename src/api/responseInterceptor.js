import axios from "axios";

export const handleErrorResponse = (thrown) => {
  if (axios.isCancel(thrown)) {
    return new Promise(() => {});
  } else {
    const { response = { status: 500 } } = thrown;

    switch (response.status) {
      case 403:
        if (response.data?.code) {
          break;
        }
      case 401:
        break;

      case 500:
        break;
    }

    return Promise.reject(response);
  }
};
