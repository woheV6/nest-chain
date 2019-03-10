import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import pageRoutes from '../../config/router.config';

const { Header } = Layout;

export default class HeaderCom extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header style={{ background: '#f44236', boxShadow: '0 2px 31px 0 rgb(225, 44, 84)', zIndex: 10}}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[]}
                        style={{ lineHeight: '64px', background: '#f44236' }}
                    >
                        {
                            pageRoutes.map( l => (
                                <Menu.Item key={l.router_key}>
                                    <Link href={l.router_url}>
                                        <a>{l.router_name}</a>
                                    </Link>
                                </Menu.Item>
                            ))
                        }
                    </Menu>
                </Header>
                <style jsx>{`
                    .logo {
                        width: 120px;
                        height: 31px;
                        background: rgba(255,255,255,.2);
                        margin: 16px 24px 16px 0;
                        float: left;
                    }
                `}</style>
            </React.Fragment>    
        )
    }
}