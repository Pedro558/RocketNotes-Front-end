import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { useState, useEffect } from 'react'
import { api } from '../../services/api'

import { FiPlus, FiSearch } from 'react-icons/fi'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'

export function Home(){
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])

  function handleTagSelected(tagName){
    const alreadySelected = tagsSelected.includes(tagName)

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected([
        ...tagsSelected,
        tagName
      ])
    }

    
  }

  useEffect(() =>{
    async function fetchTags(){
      const response = await api.get('/tags')
      setTags(response.data)
    }

    fetchTags()
  })


  return(
    <Container>
        <Brand>
          <h1>RocketNotes</h1>
        </Brand>

        <Header/>

        <Menu>
          <li>
            <ButtonText 
              title='Todos' 
              onClick={() => handleTagSelected('all')}
              isActive={tagsSelected.length === 0}
            />
          </li>

          {tags && tags.map(tag => (
            <li key={tag.id}>
              <ButtonText 
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))}
        </Menu>

        <Search>
          <Input placeholder='Pesquisar pelo título' icon={FiSearch}/>
        </Search>

        <Content>
          <Section title='Minhas notas'>
            <Note data={{
              title: 'React',
              tags: [
                {id: '1', name: 'TagName'},
                {id: '2', name: 'TagName'},
                {id: '3', name: 'TagName'}
              ]
            }}/>

          <Note data={{
              title: 'React',
              tags: [
                {id: '1', name: 'TagName'},
                {id: '2', name: 'TagName'},
                {id: '3', name: 'TagName'}
              ]
            }}/>

          <Note data={{
              title: 'React',
              tags: [
                {id: '1', name: 'TagName'},
                {id: '2', name: 'TagName'},
                {id: '3', name: 'TagName'}
              ]
            }}/>
            
          </Section>

          
        </Content>

        <NewNote to='/new'>
          <FiPlus/>
          Criar Nota
        </NewNote>
    </Container>
  )
}