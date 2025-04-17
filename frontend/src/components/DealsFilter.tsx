import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import { DealStatus } from "../../../shared/types";

import { alpha, useTheme } from "@mui/material/styles";

export interface DealsFilter {
  status: string;
  year: string;
}

interface DealsFilterProps {
  value: DealsFilter;
  onChange: (f: DealsFilter) => void;
}

export default function DealsFilter({ value, onChange }: DealsFilterProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [draft, setDraft] = useState<DealsFilter>(value);
  const isFiltered = Boolean(value.status || value.year);

  const apply = () => {
    onChange(draft);
    setAnchorEl(null);
  };

  const clear = () => {
    const empty = { status: "", year: "" };
    setDraft(empty);
    onChange(empty);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="medium"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          mb: 1,
          bgcolor: isFiltered
            ? alpha(theme.palette.primary.light, 0.1)
            : "transparent",
        }}
      >
        <FilterAltIcon
          fontSize="medium"
          color={isFiltered ? "primary" : "inherit"}
        />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box sx={{ p: 2, width: 220 }}>
          <Stack spacing={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={draft.status}
                onChange={(e) =>
                  setDraft({ ...draft, status: e.target.value as string })
                }
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value={DealStatus.BUILD}>Build</MenuItem>
                <MenuItem value={DealStatus.PITCH}>Pitch</MenuItem>
                <MenuItem value={DealStatus.NEGOTIATION}>Negotiation</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Year"
              size="small"
              value={draft.year}
              type="number"
              onChange={(e) => setDraft({ ...draft, year: e.target.value })}
            />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button size="small" onClick={clear}>
                Clear
              </Button>
              <Button variant="contained" size="small" onClick={apply}>
                Apply
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
