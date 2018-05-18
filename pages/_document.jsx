import Document, { Head, Main, NextScript } from "next/document";

const isProduction = process.env.NODE_ENV === "production";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {isProduction && (
            <link rel="stylesheet" href="/_next/static/style.css" />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
