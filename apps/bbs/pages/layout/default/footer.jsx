import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

const footerContent = {
    color: 'rgba(210, 166, 166, 0.65)',
    background: 'rgb(38, 50, 56)'
}

export default class FooterCom extends React.Component {
    render() {
        return (
            <Footer style={footerContent}  className='footer-content'>
                Nest China ©2018 Created by x-liquid Team
                <style jsx>{`
                    .footer-content {
                    }
                `}</style>

            </Footer>
        )
    }
}