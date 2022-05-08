import { notificationActions } from "../store/NotificationSlice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const useHttp = () => {
  const dispatcher = useDispatch();
  const sendRequest = useCallback(
    async (requestMetadata) => {
      dispatcher(notificationActions.send())
      const { url, method, body, headers, apply } = requestMetadata;
      try {
        const response = await fetch(url, {
          method: method ? method : "GET",
          body: body ? JSON.stringify(body) : null,
          headers: headers ? headers : {},
        });

        if (!response.ok) {
          throw new Error("Error occurred while sending request to backend");
        }
        const data = await response.json()
        apply(data)
        dispatcher(notificationActions.reset())
      } catch (error) {
        dispatcher(
          notificationActions.error(
              "Something went wrong !!"
          )
        );
      }
    },
    [dispatcher]
  );
  return {
      sendRequest
  }
};

export default useHttp;
