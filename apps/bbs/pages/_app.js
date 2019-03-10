import React, { Component } from 'react';
import App, {Container} from 'next/app'
import Head from 'next/head';
import 'antd/dist/antd.css';

class LayoutCom extends Component {
    render() {
        const { children } = this.props;
        console.log('prop', this.props);
        return (
            <div style={{height: '100%'}}>
                <Head>
                    <title>My page title</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <style>{` #__next { height: 100%; } `} </style>
                </Head>
                { children }
                <style jsx>{`
                    * {
                        margin: 0;
                        padding: 0;
                    }
                    body {
                        font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
                    }
                `}</style>
            </div>
        );
    }
}

export default class MyApp extends App {
    render () {
      const { Component, pageProps, router } = this.props;
      return (
        <Container style={{height: '100%'}}>
            <LayoutCom Component={Component} pageProps={pageProps} router={router}>
                <Component {...pageProps} router={router}/>
            </LayoutCom>
        </Container>
      )
    }
}