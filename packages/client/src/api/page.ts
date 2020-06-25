import { httpProvider } from './http';

export class PageProvider {
  /**
   * 获取所有页面
   */
  static async getPages(params) {
    return httpProvider.get('/page', { params: params });
  }

  /**
   * 获取所有已发布页面
   */
  static async getAllPublisedPages() {
    return httpProvider.get('/page', { params: { status: 'publish' } });
  }

  /**
   * 获取指定页面
   * @param id
   */
  static async getPage(id) {
    return httpProvider.get(`/page/${id}`);
  }

  /**
   * 新建页面
   * @param data
   */
  static async addPage(data) {
    return httpProvider.post('/page', data);
  }

  /**
   * 更新页面
   * @param id
   * @param data
   */
  static async updatePage(id, data) {
    return httpProvider.patch(`/page/${id}`, data);
  }

  /**
   * 更新文章阅读量
   * @param id
   * @param data
   */
  static async updatePageViews(id) {
    return httpProvider.post(`/page/${id}/views`);
  }

  /**
   * 删除页面
   * @param id
   */
  static async deletePage(id) {
    return httpProvider.delete(`/page/${id}`);
  }
}
