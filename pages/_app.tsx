import StyledThemeProvider from "../components/providers/theme"

function MyApp({ Component, pageProps }) {
  return (
    <StyledThemeProvider>
      <Component {...pageProps} />
    </StyledThemeProvider>
  )
}

export default MyApp
