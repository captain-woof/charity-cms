import { VariadicProps } from "../../types/comps";
import Textfield from "../atoms/textfield";

interface IDatalistItem {
    value: string | number
    name: string
}

interface ITextfieldSuggestive {
    name: string
    label: string
    color?: string
    bgColor?: string
    inputProps?: VariadicProps
    datalistItems: IDatalistItem[]
}

export default function TextfieldSuggestive({ name, label, color, bgColor, inputProps, datalistItems }: ITextfieldSuggestive) {
    return (
        <>
            <Textfield list={`${name}-datalist`} name={name} label={label} color={color} bgColor={bgColor} inputProps={inputProps} />
            <datalist id={`${name}-datalist`}>
                {datalistItems.map((datalistItem, index) => (
                    <option key={index} value={datalistItem.value}>{datalistItem.name}</option>
                ))}
            </datalist>
        </>
    )
}