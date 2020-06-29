# `@ramiko/server`

后台服务。配置文件在 `./src/config`。

## 模块


### 页面

- `POST /page`：创建页面
- `GET /page`：获取所有页面
- `GET /page/:id`：获取指定页面
- `POST /page/:id`：更新指定页面
- `POST /page/:id/views`：指定页面访问量 +1
- `DELETE /page/:id`：删除指定页面
