import axios from 'axios'
import React from 'react'

const Signup = () => {

    axios.post('http://locahost:5000')

    let name = document.getElementById('name')
    let email = document.getElementById('email')
    let password = document.getElementById('password')

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={()=>{}}>
               Name: <input type="email"  id='name'/> <br/>
               Email: <input type="text"  id='email'/> <br/>
                Password :<input type="password"  id='password'/><br/>

            </form>
        </div>
    )
}

export default Signup
