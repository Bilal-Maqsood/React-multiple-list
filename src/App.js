import React, { Fragment } from 'react'
import { Provider, Subscribe, Container } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

function App() {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            const lists = todos.getList()
            return (
              <div>
                <RowWrapper>
                  <label>Add Todos List</label>
                  <div className='row'>
                    <div className='col-md-4 add-list'>
                      <AddTodo placeholder='Type Name and Enter' onAdd={todos.createList} />
                    </div>
                  </div>
                </RowWrapper>
                <div className="container">
                  <div className="row">
                    {lists.map((list, index) => {
                      return (
                        <div className="col-md-6" key={index}>
                          <Title>{list.name}</Title>
                          <AddTodo index={index} placeholder='Add new todo...' onAdd={todos.createTodo} />
                          <TodoList index={index} items={list.todos} toggleComplete={todos.toggleComplete} />
                        </div>
                      )
                    })
                    }
                  </div>
                </div>
              </div>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;

`
const Title = styled.div`
  font-size: 26px;
  padding-bottom: 20px;
`

const RowWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 10px;
`

export default App
