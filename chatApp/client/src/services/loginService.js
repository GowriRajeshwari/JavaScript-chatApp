import axios from "axios";
// import userApiConstants from "../apiConstants/userApiConstant"
const url = "http://localhost:4000/users/login";
const urlreg = "http://localhost:4000/users/register";
const urlforgot = "http://localhost:4000/users/forgotpassword";
const urlresetpassword = "http://localhost:4000/users/resetPassword";
//Calling the login API using axios
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
//Calling the register API using axios
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
//Calling the Forgot Password API using axios
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
//Calling the ResetPAssword API using axios
export async function resetPassword(data,token) {
  try {
    const response = await axios.post(urlresetpassword, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
