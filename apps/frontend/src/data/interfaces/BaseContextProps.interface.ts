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
