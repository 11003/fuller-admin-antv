# fuller-admin-antv

## 登录页

![image.png](https://i.loli.net/2019/12/23/1FRk2cfQxlzwTyp.png)

## 首页

![image.png](https://i.loli.net/2019/12/23/JTYVLaIbFnh1cGf.png)

## Project setup

```
# 克隆项目
git clone https://github.com/Haiwar/fuller-admin-antv.git

# 进入项目目录
cd fuller-admin-antv

# 安装依赖(建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题)
npm install --registry=https://registry.npm.taobao.org

# npm -i
npm install

# 启动服务
npm run serve
```

## 📦 Compiles and minifies for production

```
# 打包
npm run build
```

## 层级作用

### 视图层

```
|---- layout(布局视图)
|---- components(组件视图)
|---- pages(页面视图)
```

### 状态层(vuex 仓库)

```
store(vuex 及细分的各个模块);
```

### 工具层

```
utils(utils,tools,plugins);
```

### 业务层

```
给一个 page 内具体的业务逻辑处理;
```

### 接口层

```
api(集中处理各种请求);
```

## API

### 左侧导航栏

#### 写固定的导航

在`src/settings.js`里面的`url`自定义导航，

```
{
    name: "男装",
    url: "/shop-home/Man",
    path: "stop-car-by-where",
    icon: "man" # https://www.antdv.com/components/icon-cn/
},
```

然后在`src/router.js`开启相应的路由

```
{
    path: "/shop-home/Man",
    name: "Man",
    component: () => import("./pages/ShopHome/ShoppingMall/Man/man")
  },
```

#### 通过接口展示导航栏

在`src/layout/Home.vue`的**149 行**修改`list`参数

```
# 这里的 list 就是从 src/settings.js 得到的
totalMenus = list[param];
```

### 后台接口源码(ThinkPHP5)

#### 登陆 login

```php
public function userLogin()
{
    $table = db('admin');
    $data = input('post.');
    $name = trim($data['username']);
    $result = $table->where(['username' => $name])->find();
    if(!empty($result)){
        if($data['password'] == 'admin'){
            $result['token'] = 'admin-token';
            return json(['msg'=>'登陆成功!','code'=> 20000, 'data' => $result]);
        } else {
            return json(['msg'=>'密码错误！','code'=> 10000]);
        }
    } else {
        return json(['msg'=>'用户不存在！','code'=> 10000]);
    }
}
```

#### 登出 logout

```php
public function userLogout()
{
    return json(['msg'=>'退出成功!','code'=> 20000, 'data' => "success"]);
}
```

#### 获取用户信息

```php
public function getUserInfo()
{
    $result = [
        'avatar' => "https://i.loli.net/2020/03/04/Ux6kNyCAHXTuMpt.gif",
        'introduction' => "I am a super administrator",
        'name' => "Super Admin",
        'roles' => ["admin"]
    ];
    return json(['code'=> '20000','data'=> $result]);
}
```

## 🕳 可能遇到的坑

- 跨域：http://blog.musclewiki.cn/post.html?id=52

- 有些人可能遇到`npm WARN`类型的情况

  遇到这样的情况是由于缺少`.json`文件的原因，运行这条命令生成对应文件便可解决

  ![image.png](https://i.loli.net/2020/02/26/WtpxdioZO6wHEk7.png)

```
npm init -f
```

# 类似项目

Element风格：

https://gitee.com/liuhaier/fuller-admin

## ❤ Start 一下作为鼓励 :)
