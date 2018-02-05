MagicBox

```
<!-- react-component-demo -->
## 1. 可缩放网格

```jsx
<div className="test-magic-box-container">
    <MagicBox width="100%" height="100%" isRootBox useDefLayout>
        <MagicBox><div className="test-block" style={{backgroundColor: '#9467bd'}}></div></MagicBox>
        <MagicBox><div className="test-block" style={{backgroundColor: '#8c564b'}}></div></MagicBox>
        <MagicBox><div className="test-block" style={{backgroundColor: '#e377c2'}}></div></MagicBox>
        <MagicBox><div className="test-block" style={{backgroundColor: '#f7b6d2'}}></div></MagicBox>
        <MagicBox><div className="test-block" style={{backgroundColor: '#7f7f7f'}}></div></MagicBox>
    </MagicBox>
</div>
```



## 2. IDE界面

```jsx
<div className="test-magic-box-container">
    <MagicBox width="100%" height="100%" isRootBox>
        <MagicBox width="25%" height="100%">
            <pre style={{height: '100%', width: '100%', foneSize: '12px'
                , backgroundColor: '#000', color: '#fff'}}>

{`
.. (up a dir)
</projects/sophon/sophon-docs/
▸ _book/
▸ assets/
▸ cuipeng/
▸ cuipengcheng/
▸ fanxiaopeng/
▸ hudamin/
▸ jixuecong/
▸ node_modules/
▸ rongwanru/
▾ sophon/
  ▸ doc/
  ▸ iconfont/
  ▸ img/
  ▸ map/
  ▸ patents/
  ▾ todo/
    ▸ img/
      2017.md
      2017.md.html
  ▸ ui/
    git-workflow-exams.md
    git-workflow-exams.md.html
    gitbook-server.md
    map-basics.md
    map-basics.md.preview.html
    package-version.md
    package-version.md.preview.html
    react.md
    sophon-git-workflow.md
    specs-deploy.md
    specs-exception-report.md
    specs-file-naming.md
    specs-file-naming.md.preview.html
    specs-js-coding.md
    specs-npm-package.md
    specs-pre-server.md
`}


            </pre>
        </MagicBox>
        <MagicBox left="25%" width="80%" height="100%">
            <pre style={{height: '100%', width: '100%', foneSize: '12px'
                , paddingLeft: '10px', boxSizing: 'border-box'
                , backgroundColor: '#000', color: '#fff'}}>
{`

# 智子组件库

sophon-bricks是基于React实现了一套基础的UI组件库

一、目的
抽取业务需求，构建一套标准、快捷、可扩展的组件库

二、特性

基于React组件开发
丰富的UI组件
完善的组件单元测试
支持ES6

三、运行环境

node保持和智子开发环境一致v6.10.1
npm版本>=3.0

四、开发规范

4.1 目录结构

├── Makefile
├── build                         # 站点编译目录
├── README.md
├── lib                           # 编译目录
├── doc                           # 组件文档目录
│   ├── iconfont.md               # 组件文档（示例）
│   ├── imgSliderModal.md
│   └── soSelect.md
├── index.js
├── lerna.json                    # lerna配置
├── package.json
├── packages                      # 组件库目录
│   ├── iconfont
│   ├── imgSliderModal
│   ├── soSelect                  # 组件目录 (示例)
│       ├── README.md             # README
│       ├── dropdownMenu.js
│       ├── filterMixin.js
│       ├── imgs
│       ├── index.js              # 入口文件
│       ├── optGroup.js
│       ├── option.js
│       ├── package.json          # package.json
│       ├── select.js
│       ├── selectTrigger.js
│       ├── soSelect.js
│       ├── soSelect.scss
│       └── util.js
├── scripts                       # 脚本
├── site                          # 站点文件
└── tests                         # 单元测试
    └── components                # 组件单元测试

4.2 组件开发规范

组件都在packages目录下存放
组件文件至少包含README.md，package.json, index.js文件，其它文件，文件夹可以按需添加
组件目录名称建议是短横线隔开命名， 比如：so-select
README.md文件编写组件描述，组件示例，组件文档等其它信息
package.json文件
name: 指定了组件名称，和组件目录生成规则一样
version: 指定组件版本(大版本.次版本.小版本)
desciption: 组件功能描述
main: 组件入口文件，默认是组件目录下的index.js
script: 运行脚本命令，默认一个命令是docs, 自动生成组件文档脚本
author: 作者
dependencies: 可以添加组件私有第三方依赖库

4.3 组件单元测试

测试框架与智子保持一致，使用jest，默认安装工具库enzyme, 断言库chai, 需要其它模块按需添加
组件单元测试目录test/component/, 文件命名*.js


`}
            </pre>
        </MagicBox>
    </MagicBox>
</div>
```
<!-- react-component-demo:end -->

### API
<!-- react-component-api -->
<table>
<thead>
    <tr>
        <th>name</th>
        <th>type</th>
        <th>required</th>
        <th>default</th>
        <th>default</th>
    </tr>
</thead>
<tbody>
        <tr>
            <td>top</td>
            <td>union</td>
            <td>false</td>
            <td>0</td>
            <td></td>
        </tr>
        <tr>
            <td>left</td>
            <td>union</td>
            <td>false</td>
            <td>0</td>
            <td></td>
        </tr>
        <tr>
            <td>width</td>
            <td>union</td>
            <td>false</td>
            <td>200</td>
            <td></td>
        </tr>
        <tr>
            <td>height</td>
            <td>union</td>
            <td>false</td>
            <td>100</td>
            <td></td>
        </tr>
        <tr>
            <td>isRootBox</td>
            <td>bool</td>
            <td>false</td>
            <td>false</td>
            <td></td>
        </tr>
        <tr>
            <td>isDebug</td>
            <td>bool</td>
            <td>false</td>
            <td>false</td>
            <td></td>
        </tr>
        <tr>
            <td>showHeader</td>
            <td>bool</td>
            <td>false</td>
            <td>false</td>
            <td></td>
        </tr>
        <tr>
            <td>showUUID</td>
            <td>bool</td>
            <td>false</td>
            <td>false</td>
            <td></td>
        </tr>
        <tr>
            <td>useDefLayout</td>
            <td>bool</td>
            <td>false</td>
            <td>false</td>
            <td></td>
        </tr>
</tbody>
</table>
<!-- react-component-api:end -->


