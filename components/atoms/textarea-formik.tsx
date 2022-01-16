import styled, { css } from "styled-components";
import { InlineStyled, VariadicProps } from "../../types/comps";
import { useField } from "formik";
import ErrorMessage from './error-message'

interface ITextArea extends InlineStyled {
    name: string
    label: string
    color?: string
    bgColor?: string
    inputProps?: VariadicProps
    list?: string
}

const TextfieldAndErrorWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.25rem 0;
    width: 100%;
`

const TextArea = styled.textarea<{ error?: boolean }>`
    ${({ theme, color, error }) => css`
        position: relative;
        height: 100%;
        width: 100%;
        border: none;
        outline: 2px solid ${theme.colors.primary.light};
        border-radius: 6px;
        padding: 0 1rem;
        resize: none;
        padding: 12px;

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


export default function TextAreaFormik({ name, label, color, bgColor, inputProps, style }: ITextArea) {
    const [inputPropsFormik, metaFormik] = useField(name)

    return (
        <TextfieldAndErrorWrapper style={style}>
            <Label htmlFor={name} bgColor={bgColor} color={color}>
                {label}
            </Label>
            <TextArea error={(!!metaFormik.error) && metaFormik.touched} id={name} name={name} color={color} autoComplete="off" placeholder=" " rows={6} {...inputProps} {...inputPropsFormik} />
            <ErrorMessage show={!!(metaFormik.touched && metaFormik.error)} error={metaFormik.error} style={{ marginTop: '0.25rem' }} />
        </TextfieldAndErrorWrapper>
    );
}
