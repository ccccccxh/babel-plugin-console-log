import pluginTester from 'babel-plugin-tester';
import myPlugin from '../src';
import path from 'path';

pluginTester({
  plugin: myPlugin,
  pluginName: 'myPlugin',
  // 默认插件名
  title: 'describe block title',
  // 传递给插件的 options，详见：https://babeljs.io/docs/en/plugins/#plugin-options
  pluginOptions: {
    optionA: true,
  },
  // 使用 jest 的 snapshot
  snapshot: true,
  // 读取的目录
  fixtures: path.join(__dirname, '__fixtures__'),
})
