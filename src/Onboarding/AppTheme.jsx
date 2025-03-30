import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// ✅ Define a minimal, efficient theme
const AppTheme = ({ children, disableCustomTheme }) => {
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          palette: {
            mode: "light", // Default mode (can be dynamic)
          },
          typography: {
            fontFamily: "'Roboto', sans-serif",
          },
          shape: {
            borderRadius: 8,
          },
        });
  }, [disableCustomTheme]);

  return disableCustomTheme ? <>{children}</> : <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
