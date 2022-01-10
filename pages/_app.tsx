import Navbar from "../components/molecules/navbar"
import StyledThemeProvider from "../components/providers/theme"
import Script from "next/script"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
      <StyledThemeProvider>
        <Navbar />
        <Component {...pageProps} />
      </StyledThemeProvider>
    </>
  )
}

export default MyApp
