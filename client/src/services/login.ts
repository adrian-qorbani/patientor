import axios from "axios";
import { authBaseUrl } from "../constants";
import { Credentials } from "../types";

const login = async (credentials: Credentials) => {
  const response = await axios.post(`${authBaseUrl}/login`, credentials);
  return response.data;
};

export default { login };
