import axios from "axios";
const url = "http://localhost:4000/users/login";
const urlreg = "http://localhost:4000/register";
const urlforgot = "http://localhost:4000/users/forgotpassword";
const urlresetpassword = "http://localhost:4000/users/resetPassword";

export async function login(data) {
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
export async function register(data) {
  try {
    const response = await axios.post(urlreg, data, {
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
export async function forgotpassword(data) {
  try {
    const response = await axios.post(urlforgot, data, {
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
export async function resetPassword(data) {
  try {
    const response = await axios.post(urlresetpassword, data, {
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
