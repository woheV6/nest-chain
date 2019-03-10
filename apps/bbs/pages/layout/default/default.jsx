import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import FooterCom from './footer';
import HeaderCom from './head';
import Introduce from '../introduce/index';
const { Content } = Layout;

class DefaultCom extends React.Component {
    static defaultProps = {
        style_layout_content: {
            background: '#fff', 
            padding: 24, 
            minHeight: 300
            // minHeight: window.innerHeight - 202
        }
    }; 
    render() {
        const { style_layout_content, children } = this.props;
        return (
            <Layout style={{height: '100%'}} className="layout">
                <HeaderCom />
                <Introduce />
                <Content style={{ padding: '0 50px', marginTop: 40 }}>
                    <div style={style_layout_content}>
                        { children }
                    </div>
                </Content>
                <FooterCom />
            </Layout>
        )
    }
}

// const DynamicDefaultPublish = dynamic(
//     import('./index'), 
// {ssr: false}
// );

export default DefaultCom