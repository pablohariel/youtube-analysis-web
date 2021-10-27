import { useState } from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'
import { api } from '../services/api'

export interface IUser {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

interface AuthContextData {
  user: IUser | null
  signIn: Function
  signOut: Function
}

interface IAuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
    isAdmin: boolean
    updated_at: string
  }
}

const AuthContext = createContext({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('@youmine:token')
    const userId = localStorage.getItem('@youmine:userId')

    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<IUser>(`/users/${userId}`).then(response => {
        setUser(response.data)
      })
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const result = await api.post<IAuthResponse>('/sessions', {
        email,
        password
      })

      const { token, user: userData } = result.data

      localStorage.setItem('@youmine:token', token)
      localStorage.setItem('@youmine:userId', userData.id)

      setUser(userData)

    } catch(error) {
      alert('Email ou senha inválidas')
    }
  }

  const signOut = () => {
    localStorage.removeItem('@youmine:token')
    localStorage.removeItem('@youmine:userId')

    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }