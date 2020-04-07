import React from "react"
import PropTypes from "prop-types"

const Script = ({ children }) => (
  <script dangerouslySetInnerHTML={{ __html: `(${children.toString()})();` }} />
)

const inlineScript = () => {
  var themes = {
    light: {
      "color-fg": "#000",
      "color-bg": "#fff",
      "color-accent": "red",
    },
    dark: {
      "color-fg": "#fff",
      "color-bg": "#000",
      "color-accent": "red",
    },
  }
  // Get root <html> node style interface
  var root = document.documentElement.style
  var darkMatcher = window.matchMedia("(prefers-color-scheme: dark)")
  var prefersColorScheme = darkMatcher.matches ? "dark" : "light"
  var savedTheme = localStorage.getItem("themeName")

  window.__onSetTheme = function() {}
  window.__setTheme = function(themeName) {
    window.localStorage.setItem("themeName", themeName)
    var theme = themes[themeName]
    Object.keys(theme).forEach(function(key) {
      // Set global custom properties on root element
      root.setProperty("--" + key, theme[key])
    })
    window.__onSetTheme(themeName)
    window.__currentTheme = themeName
  }
  window.__setTheme(savedTheme || prefersColorScheme)

  darkMatcher.addListener(function() {
    window.__setTheme(darkMatcher.matches ? "dark" : "light")
  })
}

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <Script>{inlineScript}</Script>
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
