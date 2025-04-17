import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ columnGap: 2 }}>
        <Typography variant="h6">SponsorCX Demo</Typography>
      </Toolbar>
    </AppBar>
  );
}
