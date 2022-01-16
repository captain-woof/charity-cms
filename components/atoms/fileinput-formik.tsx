import styled, { css } from "styled-components";
import { InlineStyled, VariadicProps } from "../../types/comps";
import { useField } from "formik";
import ErrorMessage from './error-message'
import { convertBytesToMb } from "../../utils/numerics";

interface FileInput extends InlineStyled {
    name: string
    label: string
    color?: string
    bgColor?: string
    inputProps?: VariadicProps
    fileInfo: FileInfo
}

const InputAndErrorWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.25rem 0;
    width: 100%;
`

const FileInput = styled.input<{ error?: boolean }>`
    ${({ theme, color, error }) => css`
        position: relative;
        height: 100%;
        width: 100%;
        border: none;
        outline: 2px solid ${theme.colors.primary.light};
        border-radius: 6px;
        padding: 8px;

        &:focus {
          outline: ${color ? `2px solid ${color}` : `2px solid ${theme.colors.primary.dark}`};
        }

        ${error && css`
            outline: 2px solid ${theme.colors.error.main};
        `}
    `}
`;

interface ILabel {
    bgColor: string
}

const Label = styled.label<ILabel>`
    ${({ theme, color, bgColor }) => css`
        position: relative;
        height: fit-content;
        width: fit-content;
        color: ${theme.colors.black.light};
        cursor: text;
        transition: ${theme.transition('all').fast};
        background-color: ${bgColor || theme.colors.white.light};

        &:focus {
          color: ${color || theme.colors.primary.main};
        }
    `}
`;

interface FileInfo {
    name: string
    sizeInBytes: number
}

const FileInfo = styled.p`
    ${({ theme }) => css`
        position: relative;
        height: fit-content;
        width: fit-content;
        color: ${theme.colors.primary.main};
    `}
`;


export default function FileInputFormik({ name, label, color, bgColor, inputProps, style, fileInfo }: FileInput) {
    const [inputPropsFormik, metaFormik] = useField(name)

    return (
        <InputAndErrorWrapper style={style}>
            <Label htmlFor={name} bgColor={bgColor} color={color}>
                {label}
            </Label>
            <FileInput error={(!!metaFormik.error) && metaFormik.touched} id={name} name={name} color={color} type="file" {...inputProps} {...inputPropsFormik} value={undefined}/>
            {!!fileInfo?.name &&
                <FileInfo>Uploaded: <b>{fileInfo.name}</b>{!!fileInfo.sizeInBytes && `, ${convertBytesToMb(fileInfo.sizeInBytes).toFixed(2)} MB`}</FileInfo>
            }
            <ErrorMessage show={!!(metaFormik.touched && metaFormik.error)} error={metaFormik.error} style={{ marginTop: '0.25rem' }} />
        </InputAndErrorWrapper>
    );
}
