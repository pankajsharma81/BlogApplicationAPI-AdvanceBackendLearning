export interface IAuthRepository {
  findUserById(id: string): Promise<any>;
  findUserByUsername(username: string): Promise<any>;
  findUserByEmail(email: string): Promise<any>;
  createUser(username: string, email: string, password: string): Promise<any>;
  createRefreshToken(data:{ userId: string, tokenHash: string, expiresAt: Date}): Promise<any>;
  findRefreshToken(tokenHash: string): Promise<any>;
  findRefreshTokenByUserId(userId: string): Promise<any>;
  deleteRefreshTokenById(id: string): Promise<any>;
  deleteRefreshTokenByToken(tokenHash: string): Promise<any>;
  deleteAllRefreshTokenByUser(userId: string): Promise<any>;
}
