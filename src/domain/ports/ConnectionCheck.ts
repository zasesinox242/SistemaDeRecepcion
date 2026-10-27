export interface ConnectionResult {
  ok: boolean;
  detail: string;
}

export interface ConnectionCheck {
  ping(): Promise<ConnectionResult>;
}
