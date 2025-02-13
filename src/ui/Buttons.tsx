import {MouseEventHandler} from "react";

type DefaultButtonType = {
    text: string,
    onclick?: MouseEventHandler<HTMLButtonElement>,
    customStyles?: string,
}


export const DefaultButton = ({ text, onclick, customStyles }: DefaultButtonType) =>
    // w-fit
    <button onClick={onclick || (() => {})} className={`rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 mt-2 ${customStyles}`}>
        {text}
    </button>