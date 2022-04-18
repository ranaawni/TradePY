import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';


class Trades extends Component {
constructor(props) {
  super(props);
  this.state = {
    trades : [],
    currentPage: 1,
    tradesPerPage:40

  };
  this.handleClick = this.handleClick.bind(this);

}


  componentDidMount = () =>{
    this.getTrades();
     
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  getTrades = () => {
    axios.get('http://localhost:3006/all-trades')
     .then((res) => {
      
       this.setState({trades:JSON.parse(res.data)})
     })
     .catch((err) => {
       console.log(err, 'error in get trades ')
     })
  }
   
  //function to render trades rows
   renderTrades= () =>{
    const{trades,currentPage, tradesPerPage} = this.state;
    const indexOfLastTrade = currentPage * tradesPerPage;
    const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
    const currentTrade = trades.slice(indexOfFirstTrade, indexOfLastTrade)

    return currentTrade.map((trade, index) => {
      return (
        <tr key={index}>
          <td>{trade['client']}</td>
          <td>{trade['instrument']}</td>
          <td>{trade['quantity']}</td>
          <td>{trade['direction']}</td>
        </tr>
      )
      
    }) 
  }
 
  //function to render page numbers
  renderNumber = () => {
    const{trades,currentPage, tradesPerPage} = this.state;
    const indexOfLastTrade = currentPage * tradesPerPage;
    const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;


      const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(trades.length / tradesPerPage); i++) {
      pageNumbers.push(i)
    }
    console.log(trades.length, 'trade length')

    return pageNumbers.map(number => {
      return (
        <li className='page'
        key={number}
        id={number}
   
      >
        <a className='pageNum' href='#' id={number} onClick={this.handleClick}>{number}</a>
      </li>
    
      )
    })

  }
 
  
   render () {
    return (
      <div>
        <Table  >
          <thead>
          <tr>
            <th>Client</th>
            <th>Instrument</th>
            <th>Quantity</th>
            <th>Direction</th>
          </tr>
          </thead>
          <tbody>
          {this.renderTrades()}
          </tbody>
        </Table>
        {this.renderNumber()}
      </div>
  )

   }
  
}





export default Trades