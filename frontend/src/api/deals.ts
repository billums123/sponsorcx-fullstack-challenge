import type { Deal } from "../../../shared/types";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchDeals(
  orgId: number,
  opts?: { status?: string; year?: string }
): Promise<Deal[]> {
  const params = new URLSearchParams();
  if (opts?.status) params.append("status", opts.status);
  if (opts?.year) params.append("year", opts.year);

  const url = `${API_URL}/organizations/${orgId}/deals${
    params.toString() ? `?${params}` : ""
  }`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Unable to load deals for org ${orgId} (HTTP ${res.status})`
    );
  }

  return (await res.json()).deals as Deal[];
}
