import React from 'react'
import { Outlet, NavLink, useNavigation } from 'react-router-dom'

const Root: React.FC = () => {
  const navigation = useNavigation()

  return (
    <div>
      <div>root</div>
      <nav>
        <ul>
          <li>
            <NavLink
              to={`a/1`}
              className={({ isActive, isPending }) =>
                isActive ? 'text-blue-400' : isPending ? 'pending' : ''
              }
            >
              Your Name
            </NavLink>
          </li>
          <li>
            <NavLink to={`a/2`}>Your Friend</NavLink>
          </li>
        </ul>
      </nav>
      <div className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </div>
  )
}

export default Root