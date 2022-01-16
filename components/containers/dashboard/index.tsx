import { useEffect, useState } from "react"
import Loader from "../../atoms/loader"
import { MaxWidthContainer } from "../../atoms/container"
import { showToast, showCompleteToast } from "../../../lib/toastify"
import { useRegisteredNgo } from "../../../hooks/useRegisteredNgo"
import { Heading2, Heading4 } from "../../atoms/headings"
import DatePicker from "../../atoms/datePicker"
import { getDateFromToday } from "../../../utils/date"
import SectionBox from "../../atoms/sectionBox"
import Paragraph from "../../atoms/paragraph"
import { Link } from "../../atoms/link"
import Row from "../../atoms/row"
import { StatBox } from "./stats"
import { roundOffIndian, sumAllNumbersInList } from "../../../utils/numerics"
import { fetchAllTransactions } from "../../../lib/contentful"
import { TransactionList } from "../../../types/ngo"
import LinkNext from 'next/link'
import Button from "../../atoms/button"
import styled from "styled-components"
import Footer from "../../molecules/footer"

export default function Dashboard() {
    const { loading, ngoRegistered, ngoStatus } = useRegisteredNgo()
    const [statsFromDate, setStatsFromDate] = useState<Date>(getDateFromToday(-30))
    const [statsToDate, setStatsToDate] = useState<Date>(getDateFromToday(1))
    const [ngoTransactionsList, setNgoTransactionsList] = useState<TransactionList>(null)

    // Runs stats query when date pickers change date range
    useEffect(() => {
        if (ngoStatus === "VERIFIED" && !!ngoRegistered) {
            if (statsFromDate.getTime() > statsToDate.getTime()) {
                showToast("Invalid date range", "error")
            } else {
                // Promise that fetches stats and sets them in correct states
                const fetchTxPromise = async () => {
                    const allTransactionsFetched = await fetchAllTransactions(ngoRegistered?.ngoSlug, {
                        fromDate: statsFromDate,
                        toDate: statsToDate
                    })
                    setNgoTransactionsList(allTransactionsFetched)
                    return;
                }

                // Resolve promise and show notifications
                showCompleteToast(fetchTxPromise(), {
                    pending: "Loading",
                    success: "Stats loaded",
                    error: "Error in loading stats"
                })
            }
        }
    }, [statsFromDate, statsToDate, setNgoTransactionsList, ngoRegistered, ngoStatus])

    return (
        <>
            {(loading) ?
                <Loader /> :
                <MaxWidthContainer>
                    {/* Greeting */}
                    <Heading2 style={{
                        marginBottom: "var(--sp-500)"
                    }}>
                        Hi, {(ngoRegistered?.ownerName || "welcome!").split(" ")[0]}
                    </Heading2>

                    {/* Show appropriate UI for ngo */}

                    {/* New account */}
                    {ngoStatus === "NEW_ACCOUNT" &&
                        <SectionBox>
                            <Heading4>Action needed!</Heading4>
                            <Paragraph>
                                Welcome! To get started, you must complete your registration by providing us with some details about your organisation.
                            </Paragraph>
                            <Link href="/dashboard/edit-ngo">
                                Click here to continue
                            </Link>
                        </SectionBox>
                    }

                    {/* Verification pending */}
                    {ngoStatus === "VERIFICATION_PENDING" &&
                        <SectionBox>
                            <Heading4>Verification pending!</Heading4>
                            <Paragraph>
                                We are evaluating and verifying the details you sent to us. Check back in a few days! You can also make changes to your application if you want.
                            </Paragraph>
                            <Link href="/dashboard/edit-ngo">
                                Edit details
                            </Link>
                        </SectionBox>
                    }

                    {/* Verified */}
                    {ngoStatus === "VERIFIED" &&
                        <>
                            {/* Generated page */}
                            <SectionBox>
                                <Heading4>Your page</Heading4>
                                <Paragraph>
                                    Your organisation page is up and running! If you need to change any part of it, you can do it from your dashboard.
                                </Paragraph>
                                {!!ngoRegistered &&
                                    <Link href={`/ngo/${ngoRegistered.ngoSlug}`}>
                                        See your page
                                    </Link>
                                }
                            </SectionBox>

                            {/* Donation statistics */}
                            <SectionBox style={{
                                marginTop: "var(--sp-600)"
                            }}>
                                <Heading4>Donations</Heading4>

                                {/* Stat boxes */}
                                <Row wrap hCenter vCenter style={{
                                    gap: "var(--sp-400)",
                                    marginTop: "var(--sp-400)"
                                }}>
                                    {/* Donations amount received */}
                                    <StatBox title="Donations received" stat={`₹ ${roundOffIndian(!!ngoTransactionsList ? sumAllNumbersInList(ngoTransactionsList.transactions.map(({ amount }) => (amount))) : 0)}`} />

                                    {/* Number of people donated */}
                                    <StatBox title="People donated" stat={roundOffIndian(!!ngoTransactionsList ? ngoTransactionsList.total : 0)} />
                                </Row>

                                {/* Date range pickers */}
                                <DatePickersRow>
                                    <div>
                                        From <DatePicker value={statsFromDate} onChange={setStatsFromDate} maxDate={new Date()} />
                                    </div>

                                    <div>
                                        to <DatePicker value={statsToDate} onChange={setStatsToDate} maxDate={getDateFromToday(1)} />
                                    </div>
                                </DatePickersRow>

                            </SectionBox>

                            {/* Actions */}
                            <SectionBox style={{
                                marginTop: "var(--sp-600)"
                            }}>
                                <Heading4>Actions</Heading4>
                                <Paragraph>
                                    These are the actions you can take with your account.
                                </Paragraph>

                                {/* Action buttons */}
                                <Row wrap style={{
                                    gap: "var(--sp-400)"
                                }}>
                                    {/* Edit profile */}
                                    <LinkNext passHref href="/dashboard/edit-profile"><a>
                                        <Button>Edit profile</Button>
                                    </a></LinkNext>

                                    {/* Edit NGO details */}
                                    <LinkNext passHref href="/dashboard/edit-ngo"><a>
                                        <Button>Edit organisation details</Button>
                                    </a></LinkNext>
                                </Row>
                            </SectionBox>
                        </>
                    }
                </MaxWidthContainer>
            }
            <Footer />
        </>
    )
}

// Styles
const DatePickersRow = styled.div`
    display: flex;
    margin-top: var(--sp-400);
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: var(--sp-400);

    @media (max-width: 480px){
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
    }
`