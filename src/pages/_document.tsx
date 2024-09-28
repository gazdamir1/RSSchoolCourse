import Document, { Html, Head, Main, NextScript } from "next/document"

class htmlDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/svg+xml" href="/images/icon.svg" />
          {/* <title>RSSchool Course App</title> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default htmlDocument
