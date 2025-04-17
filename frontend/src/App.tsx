import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import DealsPage from "./pages/DealsPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Header />
          <DealsPage />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
