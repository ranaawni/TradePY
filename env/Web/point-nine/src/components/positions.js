import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';


class Positions extends Component {
constructor(props) {
  super(props);
  this.state = {
    positions : [],
    currentPage: 1,
    positionsPerPage:15
  }
  this.handleClick = this.handleClick.bind(this);

}


  componentDidMount = () =>{
    this.getPositions();
     
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }


  getPositions = () => {
    axios.get('http://localhost:3006/quantities')
     .then((res) => {
      
       this.setState({positions:JSON.parse(res.data)})
     })
     .catch((err) => {
       console.log(err, 'error in get positions ')
     })
  }

  //function to render positions rows
  renderPositions = () => {
    const{positions,currentPage, positionsPerPage} = this.state;
    const indexOfLastPosition = currentPage * positionsPerPage;
    const indexOfFirstPosition = indexOfLastPosition - positionsPerPage;
    const currentPosition = positions.slice(indexOfFirstPosition, indexOfLastPosition)

  return currentPosition.map((position, index) => {
    return (
      <tr key={index}>
        <td>{position['client']}</td>
        <td>{position['instrument']}</td>
        <td>{position['sum of quantity']}</td>
        <td>{position['direction']}</td>
      </tr>
    )
  })
    
    
  }
 
  //function to render page numbers
  renderNumber = () => {
    const{positions,currentPage, positionsPerPage} = this.state;
    const indexOfLastPosition = currentPage * positionsPerPage;
    const indexOfFirstPosition = indexOfLastPosition - positionsPerPage;


      const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(positions.length / positionsPerPage); i++) {
      pageNumbers.push(i)
    }
    console.log(positions.length, 'trade length')

    return pageNumbers.map(number => {
      return (
        <li
        key={number}
        id={number}
        className='page'
      >
        <a href='#' className='pageNum' id={number} onClick={this.handleClick}>{number}</a>
      </li>
    
      )
    })

  }
  
   render () {
    return (
      <div>
        <Table striped bordered hover size="sm" >
          <thead>
          <tr>
            <th>Client</th>
            <th>Instrument</th>
            <th>Position</th>
            <th>Direction</th>
          </tr>
          </thead>
          <tbody>
          {this.renderPositions()}
          </tbody>
        </Table>
        {this.renderNumber()}

      </div>
  )

   }
  
}



export default Positions