import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { AddProducts } from './components/AddProducts';
import { ProductsContextProvider } from './global/ProductsContext';
import { Login } from './components/Login';
import { Singup } from './components/Signup';
import { auth, db } from './config/config';
import { CartContextProvider } from './global/CartContext';
import { Cart } from './components/Cart';
import { Cashout } from './components/Cashout'



export class App extends Component {

  state = {
    user: null,
  }

  componentDidMount() {

    // getting user info for navigation bar
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
          this.setState({
            user: snapshot.data().Name
          })
        })
      }
      else {
        this.setState({
          user: null
        })
      }
    })

  }

  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' Component={() => <Home user={this.state.user} />} />
              <Route path='_17103232759031qBrz8oatt2krntgTxMewE6QjIR0_Z1ef6wVWmUy34m0' Component={AddProducts} />
              <Route path='/signup' Component={Singup} />
              <Route path='/login' Component={Login} />
              <Route path="cartproducts" Component={() => <Cart user={this.state.user} />} />
              <Route path='/cashout' Component={() => <Cashout user={this.state.user} />} />
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    )
  }
}

export default App;




