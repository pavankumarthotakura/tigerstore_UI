import axios from "axios";
import { API_BASE_URL } from "../config/serverApiConfig";

class HttpService {
  async uploadFile(uploadData) {

    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    };

    let formData = new FormData();
    formData.append('file', uploadData);
    try {
      const response = await axios.post(
        API_BASE_URL + `api/v1/upload`,
        formData, axiosConfig
      );
      debugger
      if (response.status === 200) {
        return true;
      }

    } catch (error) {
      console.log(error);
    }
  }

  async fetchAll() {
    try {
      const response = await axios.get(
        API_BASE_URL + `api/v1/fetchAll`);
      debugger
      if (response.status === 200) {
        return response.data;
      }

    } catch (error) {
      console.log(error);
    }
  }

  async updateStore(data) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      }
    };
    try {
      const response = await axios.put(
        API_BASE_URL + `api/v1/UpdateStore`, data, axiosConfig);
      debugger
      if (response.status === 200) {
        return true;
      }

    } catch (error) {
      console.log(error);
    }
  }

  async deleteStoreProduct(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}api/v1/deleteStoreProduct/${id}`, {});
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async search(data) {
    try {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        }
      };

      const response = await axios.post(API_BASE_URL + `api/v1/search`, data, axiosConfig);
      if (response.status !== 200) {
        throw new Error("search error");
      }
      return response.data;
    } catch (error) {

    }
  }
}

export default HttpService;