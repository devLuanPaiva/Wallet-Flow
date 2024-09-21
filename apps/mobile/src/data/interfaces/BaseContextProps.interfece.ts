import { UserI } from "@wallet/core";
export interface BaseContextProps {
  use: UserI;
  loading: boolean;
}
export interface SectionContextProps extends BaseContextProps {
  createSection: (jwt: string) => void;
  clearSection: () => void;
  token: string | null;
}
export interface UserContextProps extends BaseContextProps {
  login: (user: Partial<UserI>) => Promise<void>;
  register: (user: UserI) => Promise<void>;
  logout: () => void;
}
