## 简介

router-demo 是一个简单的单页面路由示例。

## router.js文件

src/router.js 是路由的核心文件。基本功能如下：

1. 提供history和hash方式
2. 提供路由回调函数
3. 可用a标签或js触发路由

## 基本用法

1. 初始化一个Router，可以选择hash(默认)或history模式。

```
var router = new Router({
    root: '/history',
    mode: 'history'
});
```

2. 注册路由

```
router.route('/', function () {
    // ...
});

router.route('/black', function () {
    // ...
});
```

3. 触发路由事件，可以使用a标签触发或事件触发。

```
// a标签触发
<a href="/"></a>
<a href="/black"></a>

// 事件触发
router.navigate('/black');
```
