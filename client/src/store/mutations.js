export const state = {
  userToken: localStorage.getItem('token') || null,
  isLogin: false,
  loggedUser: localStorage.getItem('user') || null
}

export const mutations = {

  ifLogin(state) {
    if(state.userToken) {
      state.isLogin = true
    }
  }
} 