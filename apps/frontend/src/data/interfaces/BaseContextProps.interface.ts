import { UserI } from "@wallet/core";
export interface BaseContextProps {
  user: UserI | null;
  loading: boolean;
}
export interface SectionContextProps extends BaseContextProps {
  token: string | null;
  createSection: (jwt: string) => void;
  clearSection: () => void;
}
export interface UserContextProps extends BaseContextProps {
  login: (user: Partial<UserI>) => Promise<void>
  register: (user: UserI) => Promise<void>
  logout: () => void;
}