import { Organization } from "../../../shared/types";
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchOrganizations(): Promise<Organization[]> {
  const res = await fetch(`${API_URL}/organizations`);
  if (!res.ok)
    throw new Error(`Unable to load organizations  (HTTP ${res.status})`);
  const data = (await res.json()).organizations;
  return data as Organization[];
}
