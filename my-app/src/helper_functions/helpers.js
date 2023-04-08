const BASE_URL = process.env.REACT_BASE_URL;
class BandName {
  #name;
  #likes;
  constructor(name, likes) {
    this.#name = name;
    this.#likes = likes;
  }
}

class BandNameAPI {
  static #token;
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    console.debug("API Call:", url, endpoint, data, method);
    const headers = { Authorization: `Bearer ${BandNameAPI.#token}` };
    const params = method === "get" ? data : {};

    try {
      const responseData = await axios({ url, method, data, params, headers });
      return responseData.data;
    } catch (err) {
      console.error("API Error:", err);
      return err.response.data;
    }
  }
  static async addBandName(bandName) {
    try {
      const data = await this.request("band/add", bandName, "post");
    } catch (error) {}
  }
  static setToken(token) {
    this.#token = token;
  }
  static getToken() {
    return this.#token;
  }
}
