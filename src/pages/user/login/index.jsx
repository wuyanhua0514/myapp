import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
import {alias} from '@/utils/alia';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;


class Login extends Component {
  render() {
    const pattern = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}|^localhost$/g;
    const proLoginApi = location.href.includes('test') ? 'test_apibackend' : 'api_backend';
    const proUrl = location.href.includes('test')
      ? alias.testHostname
      : location.hostname.includes(alias.hostname)
      ? `http://${alias.hostname}`
      : alias.extranetHostname;
    const loginLink = (pattern.test(location.hostname)||location.hostname.includes('test.'))
      ? `${alias.openapi}test_apibackend@http://${location.host}`
      : `${alias.openapi}${proLoginApi}@${proUrl}`;
    return (
      <div className={styles.main}>
         <a href={loginLink}><button>企业qq登录</button></a>
      </div>
    );
  }
}

export default Login;
