import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history, RunTimeLayoutConfig } from '@umijs/max';
import { Fragment } from 'react';
import defaultSettings from '../config/defaultSettings';
import { internalLink } from './constants/internal_link';
import { roles } from './constants/roles';
import { errorConfig } from './requestErrorConfig';
import { getKey, keyLocalStorage } from './utils/local_storage';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState() {
  const token = getKey(keyLocalStorage.TOKEN);
  let role: string = '';
  let currentUser: any = {};
  if (!token) {
  } else {
    role = getKey(keyLocalStorage.ROLE) as string;
    currentUser.username = getKey(keyLocalStorage.USERNAME);
    switch (role) {
      case roles.PARTNER:
        history.push(internalLink.PARTNER);
        break;
      case roles.SHIPPER:
        history.push(internalLink.SHIPPER);
        break;
      case roles.CUSTOMER:
        history.push(internalLink.CUSTOMER);
        break;
      default:
        history.push(internalLink.LOGIN);
    }
  }
  return {
    currentUser: { ...currentUser },
    role: role,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return <Fragment>{children}</Fragment>;
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
