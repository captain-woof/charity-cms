import { DatePickerProps } from 'react-date-picker'
import ReactDatePicker from 'react-date-picker/dist/entry.nostyle'

export default function DatePicker(props: DatePickerProps) {
    return (
        <ReactDatePicker {...props} />
    )
}