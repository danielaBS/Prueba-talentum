import './Header.css';
import logo from '../../assets/logo.svg';
import React from 'react';

//import iconsLibrary and each icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  //Array to store data from fakestoreapi.com
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  handleClick = e => {            
  }

  componentDidMount = e =>  {   
    //fetch mock data
    /*
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  items: result
                });
              },
              // Nota: es importante manejar errores aquí y no en 
              // un bloque catch() para que no interceptemos errores
              // de errores reales en los componentes.
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
    */

    let link = document.getElementsByClassName('after');
    let dropbtn = document.getElementsByClassName('dropdown-content');

    //Add and remove class active both to links in header and to dropdown-contents from categories

    for (var i=0; i<dropbtn.length; i++) {
      dropbtn[i].className= "dropdown-content";
    }    
    if (e) {
      if (e.target.nodeName === "SPAN") {
        for (var i=0; i<link.length;i ++){
          link[i].className = "after"
        }
        e.target.parentNode.getElementsByClassName("after")[0].className+=" show"
      } else if (e.target.nodeName === "BUTTON") {
        e.target.parentNode.getElementsByClassName("dropdown-content")[0].className+=" show"
      }
    }   
     
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  // Close dropdown content when clicked outside
  handleClickOutside(event) {
    let dropbtn = document.getElementsByClassName('dropdown-content');
    if (event.target.className!=="dropbtn") {
      for (var i=0; i<dropbtn.length; i++) {
        dropbtn[i].className= "dropdown-content";
      } 
    }
  }
  
  render () {           
    const { error, isLoaded, items } = this.state;
     return (
      <> 
        <div className ="navbar">
          <div className="barMenu">
            <FontAwesomeIcon className="icons" icon={faBars} size="lg" color="gray"/>
          </div>
          <div className="brandCategories">
            <div className="brand" style={{marginRight: ' 3rem', display: 'flex', alignItems: 'center'}}>
              <img src={logo} className="cover" width="40px"></img>
              <h1 style={{marginLeft: '1rem'}}>El Clima Hoy</h1>
            </div>

            <div className ="links">
              <div>
                <span onClick={e => this.componentDidMount(e)}>HOY</span>
                <div className="after show"></div>
              </div>
              <div className="separator"></div>

              <div>
                <span onClick={e => this.componentDidMount(e)}>SEMANAL</span>
                <div className="after"></div>
              </div>
              <div className="separator"></div>
              <div>
                <span onClick={e => this.componentDidMount(e)}>MENSUAL</span>
                <div className="after"></div>
              </div>                  
            </div>
          </div>        
          <div className="searchBar">
            <input type="text" placeholder="BUSCAR"/>
            <FontAwesomeIcon className="icons" icon={faSearch} size="lg" color="gray"/>
          </div>          
        </div>        
      </>
    );
  }
}

export default Header;
