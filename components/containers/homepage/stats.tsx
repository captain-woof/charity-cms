import styled, { css } from 'styled-components'
import { ReactNode } from 'react'
import { Heading3 } from '../../atoms/headings'
import { GiReceiveMoney as TotalDonationsIcon } from 'react-icons/gi'
import { BsPeopleFill as TotalPeopleDonatedIcon } from 'react-icons/bs'
import { FaPeopleCarry as TotalNgosIcon } from 'react-icons/fa'
import { ImBooks as TotalCategoriesIcon } from 'react-icons/im'
import { roundOffIndian } from '../../../utils/numerics'

interface IStats {
    statsData: {
        totalCategories: number,
        totalDonationsAmount: number,
        totalDonationsNum: number,
        totalNgos: number
    }
}

// For the whole component (to be exported)
const StatsRow = styled.section`
    position: relative;
    height: 25vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

export default function Stats({ statsData: { totalCategories, totalDonationsAmount, totalDonationsNum, totalNgos } }: IStats) {
    return (
        <StatsRow>
            <Stat icon={<TotalDonationsIcon />} text='Total donations' stat={totalDonationsAmount} prependSymbol="₹" />
            <Stat icon={<TotalPeopleDonatedIcon />} text='People donated' stat={totalDonationsNum} />
            <Stat icon={<TotalNgosIcon />} text='Total NGOs' stat={totalNgos} />
            <Stat icon={<TotalCategoriesIcon />} text='NGO categories' stat={totalCategories} />
        </StatsRow>
    )
}

// For each statistic box
const StatBox = styled.div`
    position: relative;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.7rem 0;
    padding: var(--sp-400);
    min-width: 220px;

    @media (max-width: 480px){
        width: 50%;
    }
`

const StatText = styled.p`
    ${({ theme }) => css`
        font-weight: 600;
        color: ${theme.colors.black.light};
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0 0.5rem;
    `}
`

interface IStat {
    icon: ReactNode
    text: string
    stat: number
    prependSymbol?: string
}

const Stat = ({ icon, text, stat, prependSymbol }: IStat) => {
    return (
        <StatBox>
            <Heading3>{prependSymbol} {roundOffIndian(stat)}</Heading3>
            <StatText>{icon} {text}</StatText>
        </StatBox>
    )
}