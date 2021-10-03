//https://www.robinwieruch.de/local-storage-react
import { useState, useEffect } from "react";

const useStateWithLocalStorage = (localStorageKey, initialValue = "") => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value, localStorageKey]);

  return [value, setValue];
};
export default useStateWithLocalStorage;
