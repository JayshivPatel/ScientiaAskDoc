import React, { useEffect, useState } from "react"
import { StaticContext } from "react-router"
import { Redirect, RouteComponentProps } from "react-router-dom"

import styles from "./style.module.scss"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import { Helmet } from "react-helmet"

import authenticationService from "utils/auth"

type Props = RouteComponentProps<
  {},
  StaticContext,
  { from: { pathname: string } }
>

const SignIn: React.FC<Props> = ({ location }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  const { from } = (location && location.state) || { from: { pathname: "/" } }

  const handleSubmit = async () => {
    // Pending SSO reimplementation of EdTech services authentication
    if (await authenticationService.loginAll(username, password)) {
      setRedirect(true)
    } else {
      // TODO: Deal with failed login
      alert("Login failed.")
    }
  }

  let handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("userInfo-materials") !== null) {
      setRedirect(true)
    }
  }, [])

  if (redirect) return <Redirect to={from} />
  return (
    <>
      <Helmet>
        <title>Sign In | Scientia</title>
      </Helmet>
      <Navbar
        className={styles.navBar}
        sticky="top"
        expand="lg"
        variant="light">
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="/images/logo.svg"
            width="30"
            height="30"
            className={styles.brandLogo}
            alt="Scientia logo"
          />
        </Container>
      </Navbar>

      <div className={styles.centered}>
        <div
          style={{
            marginRight: "0.9375rem",
            marginLeft: "0.9375rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <h1 className={styles.brandName}>Scientia</h1>
          <i className={styles.tagLine}>A Unified DoC EdTech Platform</i>
        </div>
        <div
          style={{
            marginRight: "0.9375rem",
            marginLeft: "0.9375rem",
            marginTop: "1.25rem",
          }}>
          <p className={styles.inputBarHeading}>Username</p>
          <InputGroup className="mb-3">
            <FormControl
              className={styles.inputBar}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <p className={styles.inputBarHeading}>Password</p>
          <InputGroup className="mb-3">
            <FormControl
              className={styles.inputBar}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              type="password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Button
            variant="secondary"
            className={styles.inputButton}
            onClick={handleSubmit}>
            Sign In
          </Button>
        </div>
      </div>
    </>
  )
}

export default SignIn
