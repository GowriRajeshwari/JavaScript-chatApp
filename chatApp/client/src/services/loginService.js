import axios from "axios";
const url = "http://localhost:4000/users/login";

async function login(data) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default login;
