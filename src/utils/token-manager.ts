// Token manager to avoid circular dependencies
class TokenManager {
  private static instance: TokenManager;
  private token: string | null = null;
  private refreshToken: string | null = null;
  private refreshCallback: (() => Promise<boolean>) | null = null;
  private logoutCallback: (() => Promise<void>) | null = null;

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  setRefreshToken(refreshToken: string | null): void {
    this.refreshToken = refreshToken;
  }

  setRefreshCallback(callback: () => Promise<boolean>): void {
    this.refreshCallback = callback;
  }

  setLogoutCallback(callback: () => Promise<void>): void {
    this.logoutCallback = callback;
  }

  getToken(): string | null {
    return this.token;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  async refreshAccessToken(): Promise<boolean> {
    if (this.refreshCallback) {
      return await this.refreshCallback();
    }
    return false;
  }

  async logout(): Promise<void> {
    if (this.logoutCallback) {
      await this.logoutCallback();
    }
  }
}

// Export singleton instance
export const tokenManager = TokenManager.getInstance();
