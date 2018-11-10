(function(global) {
    function Router(config) {
        config = config || {};
        this.currentRoute = '';
        this.mode = config.mode || 'hash';
        this.root = config.root || '';
        this.routes = {};
        this.init();
    }

    // 消除前后斜杠
    function clearSlashes(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    // 注册路由函数
    Router.prototype.route = function (path, callback) {

        if (this.mode === 'hash') {
            this.routes[path] = callback || function () {}
        } else {
            var self = this;
            // 根据type类型，选择相应的history api。  
            this.routes[path] = function (type) {
                if (type == 1) {
                    history.pushState({path: path}, '', self.root + '/' + clearSlashes(path));
                } else if (type == 2) {
                    history.replaceState({path: path}, '', self.root + '/' + clearSlashes(path));
                }
                callback && callback();
            }
        }
    }

    // 更新页面
    Router.prototype.refresh = function (path, type) {
        path = this.routes[path] ? path : '/';
        this.routes[path](type);
    }

    // 路由跳转
    Router.prototype.navigate = function (path) {
        path = this.routes[path] ? path : '/';

        if (this.mode === 'hash') {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        } else {
            this.routes[path](1);
        }
    }

    // 初始化
    Router.prototype.init = function () {

        if (this.mode !== 'hash' && this.mode !== 'history') {
            throw new Error('mode必须是hash或history');
        }

        var self = this;

        window.addEventListener('load', function () {
            self.currentRoute = location.href.slice(location.href.lastIndexOf('/'));
            self.refresh(self.currentRoute);
        });

        if (this.mode === 'hash') {
            window.addEventListener('hashchange', function () {
                self.currentRoute = location.href.slice(location.href.lastIndexOf('/'));
                self.refresh(self.currentRoute);
            });
        } else {
            window.addEventListener('popstate', function () {
                self.currentRoute = history.state ? history.state.path : '/';
                self.refresh(self.currentRoute, 2);
            }, false);
            // 对所有的link标签进行绑定事件
            var historyLinks = document.querySelectorAll('a');
            for (var i = 0, len = historyLinks.length; i < len; i++) {
                historyLinks[i].onclick = function(e) {
                    // 阻止默认
                    e.preventDefault();
                    self.currentRoute = e.target.getAttribute('href');
                    self.refresh(self.currentRoute, 1);
                }
            }
        }
    }

    global.Router = Router;
})(this);

