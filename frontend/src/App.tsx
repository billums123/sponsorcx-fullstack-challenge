import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import DealsPage from "./pages/DealsPage";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <DealsPage />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
