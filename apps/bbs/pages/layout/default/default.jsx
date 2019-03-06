import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import FooterCom from './footer';
import HeaderCom from './head';
const { Content } = Layout;

export default class DefaultCom extends React.Component {
    static defaultProps = {
        style_layout_content: {
            background: '#fff', 
            padding: 24, 
            minHeight: window.innerHeight - 202
        }
    }; 
    render() {
        const { style_layout_content, children } = this.props;
        console.log('prop', this.props);
        return (
            <Layout className="layout">
                <HeaderCom />
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={style_layout_content}>
                        { 
                            React.Children.map(children, () => {
                                return children
                            })
                        }
                    </div>
                </Content>
                <FooterCom />
            </Layout>
        )
    }
}
