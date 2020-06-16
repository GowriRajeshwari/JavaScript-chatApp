import axios from "axios";
// const url = "http://localhost:4000/users/login";
// const urlreg = "http://localhost:4000/users/register";
// const urlforgot = "http://localhost:4000/users/forgotpassword";
// const urlresetpassword = "http://localhost:4000/users/resetPassword";
// const getuser = "http://localhost:4000/users/getUser"
// const getchat = "http://localhost:4000/users/getChat"
// const savechat = "http://localhost:4000/users/saveChat";
//Calling the login API using axios
export async function login(data) {
  //console.log(process.env);
  console.log(process.env.REACT_APP_URL)
  try {
    const response = await axios.post(process.env.REACT_APP_URL, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("response",JSON.parse(JSON.stringify(response)))
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);
    return error;
  }
}
//Calling the register API using axios
export async function register(data) {
  try {
    const response = await axios.post(process.env.REACT_APP_urlreg, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);
    return error;
  }
}
//Calling the Forgot Password API using axios
export async function forgotpassword(data) {
  try {
    const response = await axios.post(process.env.REACT_APP_urlforgot, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);
    return error;
  }
}
//Calling the ResetPAssword API using axios
export async function resetPassword(data,token) {
  try {
    const response = await axios.post(process.env.REACT_APP_urlresetpassword, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);
    return error;
  }
}
//Calling the ResetPAssword API using axios
export async function getUser() {
  console.log(process.env.REACT_APP_getuser)

  try {
    const response = await axios.get(process.env.REACT_APP_getuser);
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getChat(data) {
  try {
    const response = await axios.post(process.env.REACT_APP_getchat, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);
    return error;
  }
}


export async function saveChat(data) {
  try {
    const response = await axios.post(process.env.REACT_APP_savechat, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);
    return error;
  }
}

