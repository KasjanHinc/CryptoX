import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

const SignIn = (props) => {

  const token = localStorage.getItem('token')
  const logo = <FontAwesomeIcon icon={faCoins} size="2x" />

  if (token) {
    props.history.push('/crypto')
  }

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, updateErrors] = useState({
    message: ''
  })

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/signin', formData)
      .then(resp => {

        if (resp.data.message) {
          updateErrors(resp.data)

        } else {
          localStorage.setItem('token', resp.data.token)
          props.history.push('/crypto')
        }

      })
  }



  return <div className="container-global">

    <Fade>

      <Fade down>
        <div id="logo" >{logo}</div>
        <h1 className="signin-query signin-query-desk" >Sign in to <span className="signin-query-bold">CryptoX</span><br /></h1>
      </Fade>

      <form onSubmit={handleSubmit}>

        <div className="form-group text-center">
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
            id="input-custom"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            name="password"
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

        <button className="btn btn-secondary btn-md btn-custom">Sign In</button>

      </form>

      <p className="signup-query signup-query-desk-s" >Don&apos;t have an account?<br /> Sign up <Link to="/signup">here</Link></p>

    </Fade>
  </div>


}

export default SignIn