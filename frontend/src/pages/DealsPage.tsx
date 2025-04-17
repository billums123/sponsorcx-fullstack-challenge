import { Box, Container, Divider, Typography } from "@mui/material";
import { useState } from "react";
import OrganizationSelect from "../components/OrganizationSelect";

export default function DealsPage() {
  const [selectedOrgID, setSelectedOrgID] = useState<number | "">("");

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Select an Organization
      </Typography>

      <Box sx={{ maxWidth: 340 }}>
        <OrganizationSelect
          selectedOrgID={selectedOrgID}
          onChange={setSelectedOrgID}
        />
      </Box>

      <Divider sx={{ my: 4 }} />
    </Container>
  );
}
