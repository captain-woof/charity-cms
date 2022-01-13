import Navbar from "../components/molecules/navbar"
import StyledThemeProvider from "../components/providers/theme"
import Script from "next/script"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <StyledThemeProvider>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" autoClose={4000} newestOnTop theme="colored" limit={3} />
      </StyledThemeProvider>
    </>
  )
}

export default MyApp
