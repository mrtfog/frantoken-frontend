import { demoHoldings } from "../constants/account.constants";
import type {
  FranchiseApplication,
  TokenHolding,
  UserProfile,
} from "../types/account.type";

export interface AccountRepository {
  getProfile(userId: string): Promise<UserProfile | null>;
  saveProfile(userId: string, profile: UserProfile): Promise<void>;
  getHoldings(userId: string): Promise<TokenHolding[]>;
  getApplications(userId: string): Promise<FranchiseApplication[]>;
  saveApplication(
    userId: string,
    application: FranchiseApplication,
  ): Promise<FranchiseApplication>;
  getDraft(userId: string): Promise<unknown>;
  saveDraft(userId: string, draft: unknown): Promise<void>;
  clearDraft(userId: string): Promise<void>;
}

const key = (userId: string, item: string) =>
  `frantoken:demo:${encodeURIComponent(userId)}:${item}:v1`;
const pause = () => new Promise<void>((resolve) => setTimeout(resolve, 320));

function read(keyName: string): unknown {
  try {
    const raw = window.localStorage.getItem(keyName);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const demoAccountRepository: AccountRepository = {
  async getProfile(userId) {
    await pause();
    return read(key(userId, "profile")) as UserProfile | null;
  },
  async saveProfile(userId, profile) {
    window.localStorage.setItem(
      key(userId, "profile"),
      JSON.stringify(profile),
    );
  },
  async getHoldings(_userId) {
    await pause();
    return demoHoldings;
  },
  async getApplications(userId) {
    await pause();
    const value = read(key(userId, "applications"));
    return Array.isArray(value) ? (value as FranchiseApplication[]) : [];
  },
  async saveApplication(userId, application) {
    const applications = await this.getApplications(userId);
    window.localStorage.setItem(
      key(userId, "applications"),
      JSON.stringify([application, ...applications]),
    );
    return application;
  },
  async getDraft(userId) {
    return read(key(userId, "draft"));
  },
  async saveDraft(userId, draft) {
    window.localStorage.setItem(key(userId, "draft"), JSON.stringify(draft));
  },
  async clearDraft(userId) {
    window.localStorage.removeItem(key(userId, "draft"));
  },
};
