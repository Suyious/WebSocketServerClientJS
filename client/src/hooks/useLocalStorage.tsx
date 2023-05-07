import { useEffect, useState } from "react"

const PREFIX = "chatapp"

function useLocalStorage<Type>(key: string, initialValue: Type): [Type, React.Dispatch<React.SetStateAction<Type>>] {

    const pkey = PREFIX + "-" + key;

    const [value, setValue] = useState<Type>(() => {
        const json = localStorage.getItem(pkey);
        if(json) return JSON.parse(json);
        if(typeof initialValue === "function") {
            return initialValue();
        } else {
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(pkey, JSON.stringify(value));
    }, [value])

    return [ value, setValue ]
}

export default useLocalStorage;