import { auth } from "@trigger.dev/sdk/v3";

export async function generatePublicAccessToken(tagId: string) {
  return auth.createPublicToken({
    scopes: {
      read: {
        tags: [tagId],
      },
    },
    expirationTime: "15m",
  });
}
