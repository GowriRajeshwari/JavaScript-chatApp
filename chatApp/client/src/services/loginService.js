import axios from "axios";
//Calling the login API using axios
export function login(data) {
  try {
    const response = axios.post(process.env.REACT_APP_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    return error;
  }
}
//Calling the register API using axios
export function register(data) {
  try {
    const response = axios.post(process.env.REACT_APP_urlreg, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    return error;
  }
}
//Calling the Forgot Password API using axios
export function forgotpassword(data) {
  try {
    const response = axios.post(process.env.REACT_APP_urlforgot, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    return error;
  }
}
//Calling the ResetPAssword API using axios
export function resetPassword(data, token) {
  try {
    const response = axios.post(process.env.REACT_APP_urlresetpassword, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    return error;
  }
}
//Calling the ResetPAssword API using axios
export function getUser() {
  try {
    const response = axios.get(process.env.REACT_APP_getuser);
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    return error;
  }
}

export function getChat(data) {
  try {
    const response = axios.post(process.env.REACT_APP_getchat, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    return error;
  }
}

export function saveChat(data) {
  try {
    const response = axios.post(process.env.REACT_APP_savechat, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    return error;
  }
}
