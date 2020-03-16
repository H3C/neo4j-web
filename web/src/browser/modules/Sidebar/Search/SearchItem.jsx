import React, { Component } from 'react'
import { StyledSearchActionLink, StyledSearchItem } from '../styled'
import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'
import Form4 from './Form4'
import Form5 from './Form5'
import Form6 from './Form6'
import Form7 from './Form7'

export class SearchItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchItem: props.item
    }
  }

  onClick() {
    this.setState({
      searchItem: Object.assign({}, this.state.searchItem, {hide: !this.state.searchItem.hide})
    })
  }

  render() {
    let mappedParams
    switch (this.state.searchItem.formType) {
      case '1':
        mappedParams = (
          <Form1
            isOpen={!this.state.searchItem.hide}
            params={this.state.searchItem.params}
            command={this.state.searchItem.command}
          />
        )
        break
      case '2':
        mappedParams = (
          <Form2
            isOpen={!this.state.searchItem.hide}
            params={this.state.searchItem.params}
            command={this.state.searchItem.command}
          />
        )
        break
      case '3':
        mappedParams = (
          <Form3
            isOpen={!this.state.searchItem.hide}
            params={this.state.searchItem.params}
            command={this.state.searchItem.command}
          />
        )
        break
      case '4':
        mappedParams = (
          <Form4
            isOpen={!this.state.searchItem.hide}
            params={this.state.searchItem.params}
            command={this.state.searchItem.command}
          />
        )
        break
      case '5':
        mappedParams = (
          <Form5
            isOpen={!this.state.searchItem.hide}
            params={this.state.searchItem.params}
            command={this.state.searchItem.command}
          />
        )
        break
      case '6':
        mappedParams = (
          <Form6
            isOpen={!this.state.searchItem.hide}
            params={this.state.searchItem.params}
            command={this.state.searchItem.command}
          />
        )
        break
      case '7':
        mappedParams = (
          <Form7
            isOpen={!this.state.searchItem.hide}
            params={this.state.searchItem.params}
            command={this.state.searchItem.command}
          />
        )
        break
    }
    return (
      <StyledSearchItem>
        <StyledSearchActionLink
          key={this.state.searchItem.key}
          onClick={this.onClick.bind(this)}
          name={this.state.searchItem.name}
          title={this.state.searchItem.name}
        />
        {mappedParams}
      </StyledSearchItem>
    )
  }
}

export default SearchItem
