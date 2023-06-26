import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" Component={DefaultLayout}>
        <Route path="/" Component={Home} />
        <Route path="/history" Component={History} />
      </Route>
    </Routes>
  )
}
