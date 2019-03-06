import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
const { Header } = Layout;

export default class HeaderCom extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header style={{backgroundColor: '#f44336', boxShadow: '0 2px 5px 0 rgba(0,0,0,.26)'}}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px', background: '#f44336' }}
                    >
                        <Menu.Item key="1"><Link href="/"><a>Home</a></Link></Menu.Item>
                        <Menu.Item key="2"><Link href="/chat"><a>chat</a></Link></Menu.Item>
                        <Menu.Item key="3"><Link href='/MainPage'><a>organization</a></Link></Menu.Item>
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