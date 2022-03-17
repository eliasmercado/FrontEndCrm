import api from "@/scripts/api"

export default {
  _user: null,
  loggedIn() {
    let result = this.getUser();
    this._user = result.data;
    if (this._user === null || !result.isOk)
      return false;

    return true;
  },

  async logIn(user, password) {
    let data = {
      userName: user,
      password: password
    };

    try {
      let result;

      //Vamos a guardar en el sessionStorage la respuesta del login para usar en todo el programa
      await api.post("/login", data)
        .then(response => {
          this._user = response.data.data;
          sessionStorage.setItem("user", JSON.stringify(this._user));
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
    catch (err) {
      return {
        isOk: false,
        message: "Error inesperado en la autenticación"
      };
    }
  },

  logOut() {
    this._user = null;
    sessionStorage.removeItem("user");
  },

  getUser() {
    try {
      //Convertimos el string a un json para que el programa use los datos del usuario logueado
      let userInfoStr = sessionStorage.getItem("user");
      let user = JSON.parse(userInfoStr);

      return {
        isOk: true,
        data: user
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
  
  getAuthorizationToken() {
      //Convertimos el string a un json
      let userInfoStr = sessionStorage.getItem("user");
      let user = JSON.parse(userInfoStr);

      if (user === null)
        return null;
        
      return user.token;
  },

  //para recordar el usuario en el login
  rememberUserName(rememberMe, userName) {
    if (rememberMe)
      localStorage.setItem("userName", userName);
    else
      localStorage.removeItem("userName");
  }
};
