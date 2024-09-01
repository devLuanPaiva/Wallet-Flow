import { UserI } from "@wallet/core";
export interface BaseContextProps<T>{
  entity: T | null;
  loading: boolean;
}
export interface SectionContextProps extends BaseContextProps<UserI> {
  token: string | null;
  createSection: (jwt: string) => void;
  clearSection: () => void;
}
export interface UserContextProps extends BaseContextProps<UserI> {
  login: (user: Partial<UserI>) => Promise<void>
  register: (user: UserI) => Promise<void>
  logout: () => void;
}