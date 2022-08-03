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
      return { data: res.data, status: res.status, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  //Logs user in
  async loginUser(credentials) {
    let response = await this.request({
      endpoint: 'auth/login',
      method: 'POST',
      data: credentials,
    });
    return response;
  }

  //Signs user up
  async signupUser(credentials) {
    let response = await this.request({
      endpoint: 'auth/register',
      method: 'POST',
      data: credentials,
    });
    return response;
  }

  //Fetch user data from JWT token
  async fetchUserFromToken() {
    let response = await this.request({ endpoint: 'auth/me', method: 'GET' });
    return response;
  }

  //Logs user out
  async logoutUser() {
    this.setToken(null);
    localStorage.removeItem(this.tokenName);
  }

  //Gets retaurant list by city and state
  //Offset controls which page of results to get
  async getRestaurantsByLocation(cityState, offset) {
    // console.log(cityState)
    let response = await this.request({
      endpoint: `restaurant/location?state=${cityState.state}&city=${cityState.city}&offset=${offset}`,
    });
    return response;
  }

  //Gets menu of a restuarant from its OpenMenuId
  async getMenuByOpenMenuId(id) {
    let response = await this.request({
      endpoint: `restaurant/search?OMId=${id}`,
    });
    return response;
  }

  //Gets details about a specific menu item
  async getMenuItem(restaurantId, itemName) {
    let response = await this.request({
      endpoint: `menu/item?restaurantId=${restaurantId}&itemName=${itemName}`,
    });
    return response;
  }

  async createReview(review) {
    let response = await this.request({
      endpoint: 'review/create-review',
      method: 'POST',
      data: review,
    });
    return response;
  }

  async getReviewsForItem(restaurantId, itemName) {
    let response = await this.request({ endpoint: `review/all/review/item?restaurant_id=${restaurantId}&item_name=${itemName}` })
    return response
  }

  async getUserByUserId(id) {
    let response = await this.request({ endpoint: `auth/id?userId=${id}`})
    return response
  }
}

export default new ApiClient('http://localhost:3001');
