import { UserResponse } from "./auth.response.js";

export const mapUserResponse = (user: {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}): UserResponse => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
