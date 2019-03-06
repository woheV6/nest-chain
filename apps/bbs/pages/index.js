import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import 'antd/dist/antd.css';
import Components from './views/index';

const DynamicDefaultPublish = dynamic(
    import('./layout/default/default'), 
    {ssr: false}
);
class Home extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>My page title</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <DynamicDefaultPublish>
                </DynamicDefaultPublish>
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