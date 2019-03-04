import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import DefaultCom from './layout/default/default';

class Home extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>My page title</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <DefaultCom />
                <style jsx>{`
                h1 {
                    color: blue;
                }
                `}</style>
            </div>
        );
    }
}

export default Home;