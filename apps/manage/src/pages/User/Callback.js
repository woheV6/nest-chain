import React, { Component } from 'react';
import { Spin, Icon } from 'antd';
import { connect } from 'dva';

@connect(({ login, loading }) => ({
	login,
	loading: loading.effects['login/authentication']
}))
export default class extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({
			type: 'login/authentication'
		});
	}

	render() {
		return <Spin spinning={this.props.loading} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />;
	}
}
