import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
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

  // Group deals by deal status
  const grouped = useMemo(() => {
    const buckets: Record<DealStatus, Deal[]> = {
      [DealStatus.BUILD]: [],
      [DealStatus.PITCH]: [],
      [DealStatus.NEGOTIATION]: [],
    };
    deals?.forEach((d) => buckets[d.status].push(d));
    return buckets;
  }, [deals]);

  console.log("DEALS", grouped);
  return (
    <Container sx={{ py: 4 }}>
      {/* — Organization picker — */}
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

      {/* — Deals Section — */}
      <Typography variant="h5" gutterBottom>
        Deals
      </Typography>
      {!selectedOrgID && (
        <Alert severity="info">Choose an organization to see its deals.</Alert>
      )}
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{String(error)}</Alert>}
      {selectedOrgID && !loading && !error && deals?.length === 0 && (
        <Alert severity="warning">No deals found for this organization.</Alert>
      )}
    </Container>
  );
}
