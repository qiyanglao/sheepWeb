/** JSON字符串转换对象 */
export function toParse(str: string) {
  try {
    const parsed = JSON.parse(str || '{}')
    return parsed
  } catch (e) {
    return {}
  }
}
