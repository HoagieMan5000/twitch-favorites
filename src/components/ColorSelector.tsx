import React from "react";
import { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";

export interface ColorSelectorProps {
    color: string
    onChange: (newColor: string) => void
}

export const ColorSelector = (props: ColorSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(props.color);

    return <>
        {<div
            onClick={() => setIsOpen(!isOpen)}
            style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "grey",
                backgroundColor: props.color,
                width: 16,
                height: 16
            }}
        >
        </div>}
        {isOpen && <ChromePicker
            color={selectedColor}
            onChange={(newColor: ColorResult) => {
                setSelectedColor(newColor.hex)
            }}
            onChangeComplete={(newColor: ColorResult) => {
                props.onChange(newColor.hex);
                setSelectedColor(newColor.hex);
            }}
        />}
    </>
}