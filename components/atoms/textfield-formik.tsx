import styled, { css } from "styled-components";
import { InlineStyled, VariadicProps } from "../../types/comps";
import { useField } from "formik";
import ErrorMessage from './error-message'

interface ITextfield extends InlineStyled {
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

const TextfieldWrapper = styled.div`
    position: relative;
    height: 2.5rem;
    border-radius: 6px;
    width: 100%;
`;

const Input = styled.input<{ error?: boolean }>`
    ${({ theme, color, error }) => css`
        position: absolute;
        height: 100%;
        width: 100%;
        border: none;
        outline: 2px solid ${theme.colors.primary.light};
        top: 0;
        left: 0;
        border-radius: inherit;
        padding: 0 1rem;

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
        position: absolute;
        height: fit-content;
        width: fit-content;
        top: 0.5rem;
        left: 1rem;
        color: ${theme.colors.black.light};
        cursor: text;
        transition: ${theme.transition('all').fast};
        background-color: ${bgColor || theme.colors.white.light};

        ${Input}:focus + &,
        ${Input}:not(:placeholder-shown) + & {
          font-size: 0.85rem;
          top: -0.7rem;
          left: 0.75rem;
          padding: 0 0.25rem;
        }

        ${Input}:focus + & {
          color: ${color || theme.colors.primary.main};
        }
    `}
`;


export default function TextfieldFormik({ name, label, list, color, bgColor, inputProps, style }: ITextfield) {
    const [inputPropsFormik, metaFormik] = useField(name)

    return (
        <TextfieldAndErrorWrapper>
            <TextfieldWrapper style={style}>
                <Input error={!!metaFormik.error} list={list} id={name} name={name} color={color} autoComplete="off" placeholder=" " {...inputProps} {...inputPropsFormik} />
                <Label htmlFor={name} bgColor={bgColor} color={color}>
                    {label}
                </Label>
            </TextfieldWrapper>
            <ErrorMessage show={!!(metaFormik.touched && metaFormik.error)} error={metaFormik.error} style={{ marginTop: '0.25rem' }} />
        </TextfieldAndErrorWrapper>
    );
}
