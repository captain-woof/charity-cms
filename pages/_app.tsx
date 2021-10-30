import StyledThemeProvider from "../providers/theme"

function MyApp({ Component, pageProps }) {
  return (
    <StyledThemeProvider>
      <Component {...pageProps} />
    </StyledThemeProvider>
  )
}

export default MyApp
