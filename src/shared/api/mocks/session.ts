import { jwtVerify, SignJWT } from "jose";

type Session = {
  userId: string;
  email: string;
};

const JWT_SECRET = new TextEncoder().encode("your-secret-key");
const ACCESS_TOKEN_EXPIRY = "3s";
const REFRESH_TOKEN_EXPIRY = "7d";

export function createRefreshTokenCookie(refreshToken: string) {
  return `refreshToken=${refreshToken}; Max-Age=604800`;
}

export async function generateTokens(session: Session) {
  const accessToken = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  const refreshToken = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  return { accessToken, refreshToken };
}

export async function verifyToken(token: string): Promise<Session> {
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload as Session;
}

export async function verifyTokenOrThrow(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const session = token ? await verifyToken(token).catch(() => null) : null;

  if (!session) {
    return {
      message: "Unauthorized",
      code: "UNAUTHORIZED",
    };
  }

  return null;
}
