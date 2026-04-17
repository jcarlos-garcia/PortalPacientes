import { useMsal } from "@azure/msal-react";

export function useEmail() {
  const { accounts } = useMsal();
  return accounts[0]?.username || null;
}