import axios from "axios";

const defaultUser = null;

export default {
  _user: defaultUser,
  loggedIn() {
    return !!this._user;
  },

  async logIn(user, password) {
    let data = {
      userName: user,
      password: password
    };

    try {
      let result;
      await axios.post("http://localhost:62870/api/login", data)
        .then(response => {
          this._user = { ...defaultUser, user };
          result = {
            isOk: true,
            data: this._user
          }
        })
        .catch(error => {
          result = {
            isOk: false,
            message: error.response.data.error.message
          };
        })

      return result;
    }
    catch {
      return {
        isOk: false,
        message: "Error inesperado en la autenticación"
      };
    }
  },

  async logOut() {
    this._user = null;
  },

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false
      };
    }
  },

  async resetPassword(email) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  },
};
