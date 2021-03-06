import axios from 'axios';

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = 'the_foodie_express_token';
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = 'GET', data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async loginUser(credentials) {
    let response = await this.request({
      endpoint: 'auth/login',
      method: 'POST',
      data: credentials,
    });
    return response;
  }

  async signupUser(credentials) {
    let response = await this.request({
      endpoint: 'auth/register',
      method: 'POST',
      data: credentials,
    });
    return response;
  }

  async fetchUserFromToken() {
    let response = await this.request({ endpoint: 'auth/me', method: 'GET' });
    return response;
  }

  async logoutUser() {
    this.setToken(null);
    localStorage.removeItem(this.tokenName);
  }
}

export default new ApiClient('http://localhost:3001');
