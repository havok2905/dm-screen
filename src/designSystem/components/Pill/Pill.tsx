import { MouseEvent } from "react";
import { CloseIcon } from "../Icons";

import "./Pill.css";

export interface PillProps {
    closeFunc?: (e: MouseEvent) => void;
    clickFunc?: (e: MouseEvent) => void;
    text: string;
    customStyles?: any;
}

export const Pill = ({clickFunc, closeFunc, text, customStyles}: PillProps) => {

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        
        if (clickFunc) {
            clickFunc(e);
        }
    }

    const handleClose = (e: MouseEvent) => {
        e.preventDefault();
        // Prevent click from bubbling up to main click, if we have an interaction there.
        e.stopPropagation();

        if (closeFunc) {
            closeFunc(e);
        }
    }

    return(<button className="dm-screen-design-system-pill" onClick={handleClick} style={customStyles ? customStyles : undefined}>{text} <span className="dm-screen-design-system-pill-closeButton" onClick={handleClose}><CloseIcon /></span></button>);
}