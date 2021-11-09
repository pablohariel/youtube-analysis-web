import { useContext } from 'react'

import { LeftBar } from '../../components/LeftBar'
import { TopBar } from '../../components/TopBar'

import { AuthContext } from '../../contexts/auth'

const Contact: React.FC = () => {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <LeftBar user={user} />
      <div>
        <TopBar user={user} />
        <h1>Contact</h1>
      </div>
    </div>
  )
}

export { Contact }