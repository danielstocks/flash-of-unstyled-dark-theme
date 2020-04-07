import React, { useState, useEffect } from "react"
import "./global.css"

const Home = () => {
  const [themeName, setThemeName] = useState()

  useEffect(() => {
    setThemeName(window.__currentTheme)
  }, [])

  useEffect(() => {
    window.__onSetTheme = function(themeName) {
      setThemeName(themeName)
    }
  }, [])

  return (
    <div id="container">
      <h1>Hello World!</h1>
      <p>
        This page is currently using a <strong>{themeName}</strong> theme
      </p>
      <button
        onClick={() => {
          const current = window.__currentTheme
          const next = current === "dark" ? "light" : "dark"
          window.__setTheme(next)
        }}
      >
        Toggle
      </button>
    </div>
  )
}

export default Home
