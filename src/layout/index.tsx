import { Layout, Menu, Spin, theme } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Logo from '@/assets/redux.svg'
import routeUtils from '@/router/utils'
import { useAppSelector } from '@/hooks/store'

const { Header, Content } = Layout

const ALayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const [currentKey, setCurrentKey] = useState('/admin/home')

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const loading = useAppSelector(s => s.app.loading)

  const handleClickMenu = ({ key }: { key: string }) => {
    setCurrentKey(key)
    navigate(key)
  }

  useEffect(() => {
    setCurrentKey(pathname)
  }, [pathname])

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          padding: 8,
          alignItems: 'center',
          backgroundColor: '#fff'
        }}
      >
        <div
          onClick={() => navigate('/admin/home')}
          style={{
            cursor: 'pointer',
            flex: 0.2,
            display: 'flex',
            fontSize: 16,
            fontWeight: 'bolder',
            color: '#1677ff',
            fontStyle: 'italic'
          }}
        >
          <img src={Logo} width={40} height={40} />
          <span>ReduxAdmin</span>
        </div>
        <Menu
          theme='light'
          mode='horizontal'
          selectedKeys={[currentKey]}
          items={routeUtils.menuRoutes}
          onClick={handleClickMenu}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '8px ', height: 'calc(100vh - 64px)' }}>
        <div
          style={{
            background: colorBgContainer,
            padding: 8,
            height: '100%',
            position: 'relative',
            borderRadius: borderRadiusLG
          }}
        >
          {<Outlet />}
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
              }}
            >
              <Spin size='large' spinning={loading} />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  )
}

export default ALayout
