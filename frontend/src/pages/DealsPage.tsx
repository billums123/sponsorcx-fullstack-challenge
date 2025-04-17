import { Box } from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";

export default function DealsPage() {
  const [selectedOrg, setSelectedOrg] = useState<number | "">("");

  return (
    <Box>
      <Header selectedOrg={selectedOrg} onSelectOrg={setSelectedOrg} />
    </Box>
  );
}
