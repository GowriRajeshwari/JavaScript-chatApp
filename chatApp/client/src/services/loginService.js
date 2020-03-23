import axios from "axios";
// import userApiConstants from "../apiConstants/userApiConstant"
// const url = "http://localhost:4000/users/login";
// const urlreg = "http://localhost:4000/users/register";
// const urlforgot = "http://localhost:4000/users/forgotpassword";
// const urlresetpassword = "http://localhost:4000/users/resetPassword";
// const getuser = "http://localhost:4000/users/getUser"
// const getchat = "http://localhost:4000/users/getChat"
// const savechat = "http://localhost:4000/users/saveChat";
//Calling the login API using axios
const dotenv = require('dotenv');
dotenv.config();
export async function login(data) {
  console.log(process.env.url)
  try {
    const response = await axios.post(process.env.url, data, {
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
    const response = await axios.post(process.env.urlreg, data, {
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
    const response = await axios.post(process.env.urlforgot, data, {
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
    const response = await axios.post(process.env.urlresetpassword, data, {
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
//Calling the ResetPAssword API using axios
export async function getUser() {
  try {
    const response = await axios.get(process.env.getuser);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getChat(data) {
  try {
    const response = await axios.post(process.env.getchat, data, {
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


export async function saveChat(data) {
  try {
    const response = await axios.post(process.env.saveChat, data, {
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