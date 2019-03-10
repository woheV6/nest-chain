import React from 'react';
export default class Introduce extends React.Component {
    render() {
        return (
            <div className='introduce-content'>
                <img className='introduce-content-img' src='/static/imgs/nest.svg' />
                <h1 className='introduce-content-des'>Description</h1>
                <style jsx>{`
                    .introduce-content {
                        width: 100%;
                        height: 300px;
                        padding: 0 50px;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        background: -webkit-linear-gradient(#0e0605 ,#5d0404);
                        background: linear-gradient(#0e0605 ,#5d0404);
                        color: #fff;
                    }
                    .introduce-content-img {
                        display: block;
                        height: 100px;
                        width: 100px;
                    }
                    .introduce-content-des {
                        color: #fff;
                        color: linear-gradient(#0e0605 ,#5d0404);
                    }
                `}</style>
            </div>
        );
    }
}