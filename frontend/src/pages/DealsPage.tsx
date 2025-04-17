import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import OrganizationSelect from "../components/OrganizationSelect";
import { fetchDeals } from "../api/deals";
import { useFetch } from "../hooks/useFetch";
import { Deal, DealStatus } from "../../../shared/types";


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
      <Box sx={{ maxWidth: 340, mt: 2 }}>
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
      <Stack
        direction="row"
        spacing={4}
        sx={{ width: "100%", alignItems: "flex-start" }}
      >
        {(
          [
            [DealStatus.BUILD, "Build"],
            [DealStatus.PITCH, "Pitch"],
            [DealStatus.NEGOTIATION, "Negotiation"],
          ] as const
        ).map(([status, label]) => (
          <Paper
            key={status}
            sx={{
              flex: 1,
              minWidth: 0,
              maxHeight: "65vh",
              display: "flex",
              flexDirection: "column",
            }}
            elevation={4}
          >
            {/* Header for container */}
            <Box
              sx={{
                p: 1.5,
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: "secondary.dark",
              }}
            >
              <Typography fontWeight={600}>{label}</Typography>
            </Box>

            <Box
              sx={{
                overflowY: "auto",
                p: 1.5,
                flexGrow: 1,
              }}
            >
              {grouped[status].map((d) => (
                <Paper key={d.id} variant="outlined" sx={{ p: 1.5, mb: 1.5 }}>
                  <Typography fontWeight={600}>{d.account_name}</Typography>
                  <Typography variant="body2">{d.name}</Typography>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body2" color="text.secondary">
                      {new Date(d.start_date).toLocaleDateString()} –{" "}
                      {new Date(d.end_date).toLocaleDateString()}
                    </Typography>
                    <Typography fontWeight={700}>
                      {d.value.toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Typography>
                  </Stack>
                </Paper>
              ))}

              {grouped[status].length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No deals in {label.toLowerCase()}.
                </Typography>
              )}
            </Box>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
