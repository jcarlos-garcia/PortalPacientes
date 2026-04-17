export const msalConfig = {
  auth: {
    clientId: "604575ad-91ba-4a13-b632-e95f437a29d2",
    authority: "https://login.microsoftonline.com/28be9bb1-d932-4323-9d48-0e662c6549e7",
    redirectUri: "http://localhost:5173",
    postLogoutRedirectUri: "http://localhost:5173"
  }
};

export const loginRequest = {
  scopes: [
    "api://ac3118cf-bdce-4aa6-ae98-47edf475cdbf/access_as_user"
  ]
};