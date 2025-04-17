import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useFetch } from "../hooks/useFetch";
import { fetchOrganizations } from "../api/organizations";
import type { Organization } from "../../../shared/types";

interface OrganizationSelectProps {
  selectedOrgID: number | "";
  onChange: (value: number) => void;
}

// Dropdown that lists every organization in the DB
export default function OrganizationSelect({
  selectedOrgID,
  onChange,
}: OrganizationSelectProps) {
  const { data: orgs, loading, error } = useFetch(fetchOrganizations);

  const handleChangeSelect = (e: SelectChangeEvent) => {
    onChange(Number(e.target.value));
  };

  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="org-label">Organization</InputLabel>
      <Select
        labelId="org-label"
        value={String(selectedOrgID)}
        label="Organization"
        onChange={handleChangeSelect}
        disabled={loading || !!error}
      >
        {orgs?.map((o: Organization) => (
          <MenuItem key={o.id} value={o.id}>
            {o.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
