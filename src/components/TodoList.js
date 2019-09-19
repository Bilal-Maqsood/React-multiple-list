import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem'


class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filter: 'all',
      filteredItems: [],
      items: []
    }

  }

  componentDidMount(){
    this.setState({
      filteredItems: this.props.items
    })
  }

  handleChange = (e) => {
    this.setState({
      filter: e.target.value
    },()=>{
      this.getFilteredItems()
    })
  }

  getFilteredItems = () => {
    const filterData = this.props.items.filter((item)=>{
        if(this.state.filter == 'all'){
          return true;
        } else if(this.state.filter == 'completed'){
          return item.completed === true;
        } else {
          return item.completed === false;           
        }
    })
    this.setState({
      filteredItems: filterData
    })
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      items: nextProps.items,
    };
  }

  componentDidUpdate(prevState){
     if(prevState.items !== this.state.items){
       this.getFilteredItems()
     }
  }

  render(){
    const {toggleComplete, index} = this.props;
    const {filteredItems} = this.state;
    return(
      <Wrapper>
          <div className='row'>
          <div className="col-md-6">
            <p>
              Filter by:
            </p>
            </div>
            <div className='col-md-6'>
              <select className='filter-dropdown' value={this.state.value} onChange={this.handleChange}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
              </select>
            </div>
            </div>
      {filteredItems.map(item => {
        const onComplete = e => {
          toggleComplete(item.id, index )
        }
  
        return <TodoItem key={item.id} {...item} onComplete={onComplete} />
      })}
    </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default TodoList
