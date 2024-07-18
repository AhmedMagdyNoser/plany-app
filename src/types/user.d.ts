export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  imgUrl: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
} | null;

export interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
}
