import React, {SetStateAction} from "react";
import {Divider} from "@material-ui/core";

export namespace Utils {

    export namespace Component {
        export function joinComponent(wit: "divider", ...elements: JSX.Element[]) {
            const a: JSX.Element[] = [];
            elements.forEach((e, i) => {
                if (i !== 0 && i <= elements.length - 1 && wit === "divider") a.push(<Divider key={Math.random().toString()}/>);
                a.push(e);
            })
            return a;
        }


        export function extract<T>(useState: [T, React.Dispatch<SetStateAction<T>>]) {
            const [get, set] = useState;
            return {
                get,
                set
            };
        }
    }


}

