import { useState } from 'react'
import { useAuth } from '../../hooks/auth'

import { Container, Form, Avatar } from "./styles";

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

import { Link } from 'react-router-dom'

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'


export function Profile(){
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState()
  const [passwordNew, setPasswordNew] = useState()

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder

  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)

  function handleChangeAvatar(e){
    const file = e.target.files[0]
    setAvatarFile(file)

    const imagePreview = URL.createObjectURL(file)
    

    setAvatar(imagePreview)
  }

  async function handleUpdate(){
    const updated ={
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    }

    const userUpdated = Object.assign(user, updated)
    
    await updateProfile({user: userUpdated, avatarFile})
  }

  

  return(
    <Container>
      <header>
        <Link to={-1}>
          <FiArrowLeft />
        </Link>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto de perfil do usuário" />

          <label htmlFor="avatar">
            <FiCamera/>

            <input 
              id='avatar' 
              type="file" 
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>

        <Input
          placeholder='Nome'
          type='text'
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder='E-mail'
          type='email'
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder='Senha Atual'
          type='password'
          icon={FiLock}
          onChange={e => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder='Nova Senha'
          type='password'
          icon={FiLock}
          onChange={e => setPasswordNew(e.target.value)}
        />

        <Button title='Salvar' onClick={handleUpdate}/>

      </Form>
    </Container>
  )
}