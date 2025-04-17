import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Box, CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Box>Hello From App</Box>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
