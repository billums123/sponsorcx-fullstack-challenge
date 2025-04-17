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

// This was derived from looking at the values shown in the image shared in the README for a potential design pattern
const DEAL_PROBABILITIES = {
  [DealStatus.BUILD]: 0.2,
  [DealStatus.PITCH]: 0.4,
  [DealStatus.NEGOTIATION]: 0.6,
};

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

  // Calculate total values for each group of deals
  const totals: Record<DealStatus, number> = Object.fromEntries(
    Object.entries(grouped).map(([status, list]) => [
      status,
      list.reduce((sum, d) => sum + d.value, 0),
    ])
  ) as Record<DealStatus, number>;

  // Calculate grand totals
  const netTotal = Object.values(totals).reduce((s, v) => s + v, 0);
  const probTotal = (Object.entries(totals) as [DealStatus, number][]).reduce(
    (s, [status, v]) => s + v * DEAL_PROBABILITIES[status],
    0
  );

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
      <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 1 }}>
        <Typography variant="h5">Deals</Typography>

        {/* Display Net Value | Probability Value total */}
        <Typography variant="subtitle2" color="text.secondary" sx={{}}>
          Net Value:{" "}
          {netTotal.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Probability Value:&nbsp;
          {probTotal.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </Typography>
      </Stack>

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
              <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                {/* raw total */}
                <Typography variant="body2" fontWeight={400}>
                  {totals[status].toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                </Typography>

                {/* vertical bar */}
                <Box
                  sx={{
                    display: "inline-block",
                    width: 0,
                    height: "1.4em",
                    borderLeft: "2px solid",
                    borderColor: "divider",
                  }}
                />

                {/* weighted total */}
                <Typography variant="body2" fontWeight={400}>
                  {(totals[status] * DEAL_PROBABILITIES[status]).toLocaleString(
                    undefined,
                    {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }
                  )}
                </Typography>
              </Box>
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
