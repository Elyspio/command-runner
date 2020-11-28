import React, {SetStateAction} from "react";

export function extract<T>(useState: [T, React.Dispatch<SetStateAction<T>>]) {
    const [get, set] = useState;
    return {
        get,
        set
    };
}



