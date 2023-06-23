import React, { useLayoutEffect, useState } from 'react'
import { ConfigProvider, Layout, Tabs } from 'antd'

import { MovieService } from './Services'
import { Context } from './Context'
import SearchTab from './Components/SearchTab'
import RatedTab from './Components/RatedTab'

const { Content } = Layout

const App = () => {
  const [movie] = useState(new MovieService())

  useLayoutEffect(() => {
    const createSession = async () => await movie.CreateGuestSession()
    createSession()
  }, [])

  const tabs = [
    {
      key: 1,
      label: 'Search',
      children: <SearchTab />,
    },
    {
      key: 2,
      label: 'Rated',
      children: <RatedTab />,
    },
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 12,
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      <Context.Provider
        value={{
          movie,
        }}
      >
        <Layout>
          <Content>
            <Tabs
              defaultActiveKey={1}
              items={tabs}
              style={{ background: '#fff', justifyContent: 'center' }}
              destroyInactiveTabPane={true}
            />
          </Content>
        </Layout>
      </Context.Provider>
    </ConfigProvider>
  )
}

export default App
