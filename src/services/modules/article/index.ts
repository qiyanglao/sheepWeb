import { http } from '@/services'
import { ArticleItemType } from './types'
import { RequestParamsType } from '@/services/types'

/** 获取文章列表 */
export function selectArticleList(params: RequestParamsType) {
  return http.request<ArticleItemType[]>('get', '/article/select', {
    params
  })
}
