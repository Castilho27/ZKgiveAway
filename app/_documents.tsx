import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Caminho absoluto a partir da pasta public */}
        <link rel="icon" href="/favicon.ico" /> {/* Nome padrão recomendado */}
        
        {/* Ou se quiser usar seu arquivo específico: */}
        {/* <link rel="icon" href="/images/Faviicon.ico" /> */}
        
        {/* Metatags recomendadas */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}