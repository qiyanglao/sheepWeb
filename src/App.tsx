import { ConfigProvider } from 'antd'
import { combineRoutes } from '@/router'
import { useRoutes } from 'react-router-dom'

interface IProps {}

const App: React.FC<IProps> = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // 配置主题色
          // colorPrimary: "#52c41a",
        }
      }}
    >
      {useRoutes(combineRoutes)}
    </ConfigProvider>
  )
}
export default App
