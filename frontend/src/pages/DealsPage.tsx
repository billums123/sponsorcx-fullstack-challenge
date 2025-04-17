import { Box, Container, Divider, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import OrganizationSelect from "../components/OrganizationSelect";
import { fetchDeals } from "../api/deals";
import { useFetch } from "../hooks/useFetch";

export default function DealsPage() {
  const [selectedOrgID, setSelectedOrgID] = useState<number | "">("");

  const fetchDealsForOrg = useMemo(() => {
    return () =>
      selectedOrgID ? fetchDeals(selectedOrgID) : Promise.resolve([]);
  }, [selectedOrgID]);

  const { data: deals = [], loading, error } = useFetch(fetchDealsForOrg);
  console.log("DEALS", deals);
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
