const initialState = {
  'parks': [],
  'stores': [],
  'user': null,
  'menu': false,
  'error': null,
  'signupdata': {
    username: '',
    email: '',
    passwordone: '',
    passwordtwo: ''
  },
  'signindata': {
    email: '',
    password: ''
  },
  'pwforgot': {
    email: ''
  },
  'pwchange': {
    passwordone: '',
    passwordtwo: ''
  }
};

export default initialState;