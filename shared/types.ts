export enum DealStatus {
  BUILD = "build",
  PITCH = "pitch",
  NEGOTIATION = "negotiation",
}

export interface Organization {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Account {
  id: number;
  name: string;
  organization_id: number;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: number;
  name: string;
  account_id: number;
  start_date: string;
  end_date: string;
  value: number;
  status: DealStatus;
  created_at: string;
  updated_at: string;
}
