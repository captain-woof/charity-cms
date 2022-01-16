import { useField } from 'formik';
import styled, { css } from 'styled-components'
import { InlineStyled, VariadicProps } from '../../types/comps';
import ErrorMessage from './error-message';

interface RadioButtons extends InlineStyled {
    label: string
    name: string
    valuesAndLabels: Array<{
        value: any
        label: string
    }>
    inputProps?: VariadicProps
    selectedValue: string
}

export default function RadioButtons({ name, label, inputProps, style, valuesAndLabels, selectedValue }: RadioButtons) {
    const [inputPropsFormik, metaFormik] = useField(name)

    return (
        <Wrapper>
            <GroupLabel>
                {label}
            </GroupLabel>
            <RadioGroup style={style}>
                {valuesAndLabels.map(({ label, value }, index) => (
                    <Label key={`${index}-${value}-checked:${value === selectedValue}`}>
                        <Radio type="radio" name={name} {...inputProps} {...inputPropsFormik} value={value} checked={value === selectedValue}/> {label}
                    </Label>
                ))}
            </RadioGroup>
            <ErrorMessage show={!!(metaFormik.touched && metaFormik.error)} error={metaFormik.error} style={{ marginTop: '0.25rem' }} />
        </Wrapper>
    )
}

// Styles
const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.25rem 0;
    width: 100%;
`

const RadioGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-400);
`

const GroupLabel = styled.label`
    ${({ theme}) => css`
        position: relative;
        height: fit-content;
        width: fit-content;
        color: ${theme.colors.black.light};
        cursor: text;
        transition: ${theme.transition('all').fast};
        background-color: theme.colors.white.light;

        &:focus {
          color: theme.colors.primary.main;
        }
    `}
`;

const Label = styled.label`

`

const Radio = styled.input`

`