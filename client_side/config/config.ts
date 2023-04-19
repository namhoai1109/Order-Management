// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import colors from './colors';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import themeProvider from './themeProvider';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  hash: true,
  routes,
  define: {
    HOST_NAME: 'https://79fb-14-186-4-94.ngrok-free.app',
  },
  theme: {
    ...colors,
    'max-width': '1280px',
    'width-845': '845px',
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  model: {},
  initialState: {},
  title: 'SQL project',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
  },
  antd: {
    configProvider: {
      theme: {
        token: themeProvider.token,
      },
    },
  },
  request: {},
  access: {
    strictMode: true,
  },
  headScripts: [{ src: '/scripts/loading.js', async: true }],
  presets: ['umi-presets-pro'],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
});
