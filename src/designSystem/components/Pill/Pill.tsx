import { MouseEvent } from "react";
import { IconButton } from '@designSystem/components';
  

import "./Pill.css";

export interface PillProps {
    closeFunc?: (e: MouseEvent) => void;
    text: string;
    customStyles?: any;
}

export const Pill = ({closeFunc, text, customStyles}: PillProps) => {

    const handleClose = (e: MouseEvent) => {
        e.preventDefault();
        // Prevent click from bubbling up to main click, if we have an interaction there.
        e.stopPropagation();

        if (closeFunc) {
            closeFunc(e);
        }
    }

    return(<span className="dm-screen-design-system-pill" style={customStyles ? customStyles : undefined}>{text} <span className="dm-screen-design-system-pill-closeButton" onClick={handleClose}><IconButton icon="close" onClick={handleClose} /></span></span>);
}