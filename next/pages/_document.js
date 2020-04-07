import Document, {Html, Head, Main, NextScript} from 'next/document';

const Script = ({children}) => (
  <script dangerouslySetInnerHTML={{__html: `(${children.toString()})();`}} />
);

const inlineScript = () => {
  var themes = {
    light: {
      'color-fg': '#000',
      'color-bg': '#fff',
      'color-accent': 'red',
    },
    dark: {
      'color-fg': '#fff',
      'color-bg': '#000',
      'color-accent': 'red',
    },
  };
  // Get root <html> node style interface
  var root = document.documentElement.style;
  var darkMatcher = window.matchMedia('(prefers-color-scheme: dark)');
  var prefersColorScheme = darkMatcher.matches ? 'dark' : 'light';
  var savedTheme = localStorage.getItem('themeName');

  window.__onSetTheme = function() {};
  window.__setTheme = function(themeName) {
    window.localStorage.setItem('themeName', themeName);
    var theme = themes[themeName];
    Object.keys(theme).forEach(function(key) {
      // Set global custom properties on root element
      root.setProperty('--' + key, theme[key]);
    });
    window.__onSetTheme(themeName);
    window.__currentTheme = themeName;
  };
  window.__setTheme(savedTheme || prefersColorScheme);

  darkMatcher.addListener(function() {
    window.__setTheme(darkMatcher.matches ? 'dark' : 'light');
  });
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Script>{inlineScript}</Script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
