//https://www.robinwieruch.de/local-storage-react
import { useEffect, useState } from "react";

function useStateWithLocalStorage(
    localStorageKey: string,
    initialValue: string
): [string, typeof setValue] {
    const [value, setValue] = useState<string>(
        localStorage.getItem(localStorageKey) || initialValue
    );

    useEffect(() => {
        localStorage.setItem(localStorageKey, value);
    }, [value, localStorageKey]);

    return [value, setValue];
}
export default useStateWithLocalStorage;
