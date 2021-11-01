import Navbar from "../components/molecules/navbar"
import StyledThemeProvider from "../components/providers/theme"

function MyApp({ Component, pageProps }) {
  return (
    <StyledThemeProvider>
      <Navbar />
      <Component {...pageProps} />
    </StyledThemeProvider>
  )
}

export default MyApp
