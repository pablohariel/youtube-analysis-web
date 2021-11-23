import { IUser } from '../../../contexts/auth'

import styles from './styles.module.scss'

interface IProps {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

import userImg from '../../../assets/userImg.png'

import { useState } from 'react'
import { api } from '../../../services/api'

const Card: React.FC<IProps> = ({ user, setUser }) => {
  const [editImg, setEditImg] = useState<boolean>(true)
  const [editName, setEditName] = useState<boolean>(true)

  const [name, setName] = useState<string>(user.name)
  const [img, setImg] = useState<string | null>(null)

  const nameIsEqual = name === user.name

  console.log(img)

  const handleSave = async () => {
    if(!nameIsEqual) {
      try {
        const token = localStorage.getItem('@youmine:token')
        api.defaults.headers.common.authorization = `Bearer ${token}`

        const userUpdated = await api.put<IUser>(`/users/${user.id}`, { name })

        setUser(userUpdated.data)

        console.log(userUpdated)
      } catch(error) {
        alert('Não foi possivel atualizar dados do usuário')
      }
    } else {
      setEditName(!editName)
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <h2 className={styles.title}>Informações</h2>
      <div className={styles.userInfo}>
        
        <div className={styles.inputWrapper}>
          <label className={styles.label}>
            Foto  
          </label>

          <label className={styles.inputImg} htmlFor='image'>
            <img className={styles.img} src={userImg} />
            <input style={{ display: 'none' }} type='file' id='image' accept="image/*" onChange={event => setImg(event.target.value)} disabled={editImg} />
          </label>
          <div className={styles.btnEdit}> 
            <button type='button' onClick={() => setEditImg(!editImg)}>Editar</button>
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>
            Nome
          </label>
          <input className={styles.input} value={name} onChange={event => setName(event.target.value)} disabled={editName} />
          <div className={styles.btnEdit}>  
            {editName ? 
              <button type='button' onClick={() => setEditName(!editName)}>Editar</button>
              :
              <button type='button' onClick={handleSave}>Salvar</button>
            }
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>
            Email
          </label>
          <input className={styles.input} value={user?.email} disabled />
          <div className={styles.btnEdit} /> 
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>
            Senha
          </label>
          <input className={styles.input} type='password' value='abcdefghijklmn' disabled />
          <div className={styles.btnEdit} /> 
        </div>
      </div>
    </div>
  )
}

export { Card }