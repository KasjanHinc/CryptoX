import React, { useState } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'


const SignUp = (props) => {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isAdmin: false,
    image: 'https://i.imgur.com/uQyt00P.jpg'
  })

  const [errors, updateErrors] = useState({
    message: ''
  })


  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {

    event.preventDefault()

    axios.post('/api/signup', formData)
      .then(resp => {

        if (resp.data.message) {

          updateErrors(resp.data)
        } else {
          props.history.push('/')
        }
      })

  }



  return <div className="container-global global-desk">
    <Fade>

      <Fade down>
        <h1 className="signin-query sq-desk" >Sign up for your personal <span className="signin-query-bold">Crypto</span> account</h1>
      </Fade>

      <form onSubmit={handleSubmit}>

        <div className="form-group text-center">
          <input
            className="form-control"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            value={formData.username}
            name="username"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            name="email"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Confirm Password"
            type="password"
            onChange={handleChange}
            value={formData.passwordConfirmation}
            name="passwordConfirmation"
            required
          />
        </div>

        {errors.message &&
          <Fade appear spy={errors}>
            <div className="error-container">
              <p id="error" >
                {errors.message}
              </p>
            </div>
          </Fade>}

        <button className="btn btn-secondary btn-md btn-custom">Sign Up</button>

      </form>

    </Fade>

  </div>


}

export default SignUp