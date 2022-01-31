import React from 'react';

import './main.css';

import {Card, Accordion} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";

import cali from '../../assets/background.png';
import temp from '../../assets/temp.png';
import humidity from '../../assets/humidity.png';
import wind from '../../assets/wind.png';
import prec from '../../assets/cloud-showers-heavy-solid.svg';
import sun from '../../assets/sun-regular.svg';
 
import Moment from 'moment';
import 'moment/locale/es';

const data = [
  { hora: '07:00', Hum: '33', vel: '1.5', ref: '30%-50% - 3m/s'},
  { hora: '08:00', Hum: '27', vel: '1.0', ref: '30%-50% - 3m/s'},
  { hora: '09:00', Hum: '38', vel: '2.0', ref: '30%-50% - 3m/s'},
  { hora: '10:00', Hum: '21', vel: '1.7', ref: '30%-50% - 3m/s'},
  { hora: '11:00', Hum: '27', vel: '2.3', ref: '30%-50% - 3m/s'},
  { hora: '12:00', Hum: '36', vel: '2.3', ref: '30%-50% - 3m/s'},
  { hora: '13:00', Hum: '33', vel: '1.1', ref: '30%-50% - 3m/s'},
  { hora: '14:00', Hum: '21', vel: '1.7', ref: '30%-50% - 3m/s'},
  { hora: '15:00', Hum: '33', vel: '1.9', ref: '30%-50% - 3m/s'},
];

const columns = [
  { dataField: 'hora', text: 'Hora' },
  { dataField: 'Hum', text: 'Humedad (%)' },
  { dataField: 'vel', text: 'Vel. Viento (m/s)' },
  { dataField: 'ref', text: 'Valor referencia' },
];

const pagination = paginationFactory({
  page: 2,
  sizePerPage: 3,  
  nextPageText: '>',
  prePageText: '<',
  showTotal: false,
  alwaysShowAllBtns: true,
  sizePerPageList: false,
  hideSizePerPage: true,
  onPageChange: function (page, sizePerPage) {    
  },  
});

Moment.locale('es');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      errorFail: null,
      isLoadedFail: false,
      itemsFail: [],
      errorData: null,
      isLoadedData: false,
      itemsTemp: [],
      range:7
    };    
  }
  
  changeRange = (rangeInput) => {  
    const requestOptionsData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "key": "key",
        "data": {
          "range": rangeInput
        }
      })
    };   
    fetch("http://localhost:8000/weather/getByTimeRange", requestOptionsData)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoadedData: true,
          itemsTemp: result,
        });
      },
      // Nota: es importante manejar errores aquí y no en 
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (errorData) => {
        this.setState({
          isLoadedData: true,
           errorData
        });
      }
    ) 
  }

  componentDidMount() {          
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "key": "key",
        "data": {
          "city": 4
        }
      })
    };
    const requestOptionsFail = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "key": "hola",
        "data":{}
      })
    };    

    const requestOptionsData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "key": "key",
        "data": {
          "range": 7
        }
      })
    };   

    fetch("http://localhost:8000/weather", requestOptions)
      .then(res => res.json())
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

      fetch("http://localhost:8000/weather", requestOptionsFail)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoadedFail: true,
            itemsFail: result
          });
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (errorFail) => {
          this.setState({
            isLoadedFail: true,
            errorFail
          });
        }
      )       
            
    fetch("http://localhost:8000/weather/getByTimeRange", requestOptionsData)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoadedData: true,
          itemsTemp: result,
        });
      },
      // Nota: es importante manejar errores aquí y no en 
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (errorData) => {
        this.setState({
          isLoadedData: true,
           errorData
        });
      }
    ) 
  }

  render() {
    const { error, isLoaded, items, errorFail, isLoadedFail, itemsFail, errorData, isLoadedData, itemsTemp } = this.state;    
    const columnsTemp = [
      { dataField: 'date', text: 'Fecha' },
      { dataField: 'temperature', text: 'Temperatura (°C)' },      
    ];    
    
    if (error) {
      return <></>
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="containerWeather d-flex justify-content-between flex-wrap">
          <div className="main-card col-lg-3 col-md-12 col-sm-12 d-flex ">
            <Card style={{ width: '100%', textAlign:'center', backgroundColor: 'white'}}>
              <div className='card-picture d-flex flex-column'>
                <div className='d-flex justify-content-center'>
                  <Card.Img variant="top" src={cali} />
                  <Card.Title>
                    <h2>{items.name}</h2>
                    <p style={{fontSize:'16px'}}>{Moment().format('DDD MMM YYYY HH:mm')}</p>
                    <h1>{items.main.temp}°c</h1>
                  </Card.Title>
                </div>
                <div className="weather-type d-flex flex-colum align-items-center justify-content-start">
                  <p className='weather-data' style={{ paddingBottom: '0'}}><strong>Clima /</strong> {items.weather[0].main}</p>
                </div>                
              </div>                  
              <Card.Body className='d-flex flex-column'>
                <div className='d-flex justify-content-between'>
                  <Card.Text>   
                    <img style={{marginRight:'10px'}} src={temp} width="32px"/>
                    Temperatura
                  </Card.Text>
                  <Card.Text>
                    {items.main.temp}°
                  </Card.Text>
                </div>
                <div className='d-flex justify-content-between'>
                  <Card.Text>
                    <img style={{marginRight:'12px'}} src={humidity} width="28px"/>
                    Humedad
                  </Card.Text>
                  <Card.Text>
                    {items.main.humidity}%
                  </Card.Text>
                </div>
                <div className='d-flex justify-content-between'>
                  <Card.Text>   
                    <img style={{marginRight:'10px'}} src={wind} width="30px"/>
                    Velocidad del viento
                  </Card.Text>
                  <Card.Text>
                    {items.wind.speed}m/s
                  </Card.Text>
                </div>
                <div className='d-flex justify-content-between'>
                  <Card.Text>   
                    <img style={{marginRight:'10px'}} src={sun} width="30px"/>
                    Indice UV
                  </Card.Text>
                  <Card.Text>
                    {items.weather[0].uv} - Poco saludable
                  </Card.Text>
                </div>
                <div className='d-flex justify-content-between  align-items-start'>
                  <Card.Text className="d-flex">   
                    <img style={{marginRight:'10px'}} src={prec} width="30px"/>
                    Precipitaciones
                  </Card.Text>
                  <Card.Text>
                    {items.weather[0].precip }
                  </Card.Text>
                </div>                
              </Card.Body>               
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Ver más</Accordion.Header>
                  <Accordion.Body>
                    La información presentada aquí es falsa.
                  </Accordion.Body>
                </Accordion.Item>                
              </Accordion>              
            </Card>
          </div>    
          <div className='col-md-5 col-sm-12 d-flex justify-content-center align-items-center flex-column add'>
            <br></br>
            <Card className='data-card'>
              <Card.Body>
                <div className='d-flex flex-row justify-content-between'>
                  <div>
                    <Card.Title>Temperatura</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Promedio por día</Card.Subtitle>          
                  </div>  
                  <div>
                  <select name="range" id="range" onChange={e => this.changeRange(e.target.value)}>
                    <option value="0">Rango de tiempo</option>  
                    <option value="7">Semanal</option>
                    <option value="30">Mensual</option>                  
                  </select>
                  </div>                  
                </div>                
                {                  
                  errorData? (
                    <>Error..</>
                  ) : isLoadedData !=true ? (
                    <>Cargando...</>
                  ) : (                    
                    <BootstrapTable keyField='id' style={{overflowX:'auto'}} data={itemsTemp} columns={columnsTemp} pagination={pagination}/>                   
                  )
                }
              </Card.Body>            
            </Card>
            <Card className='data-card'>
              <Card.Body>
                <Card.Title>Humedad - Velocidad de Viento</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Promedio por hora</Card.Subtitle>
                <BootstrapTable keyField='id' data={data} columns={columns} pagination={pagination}/>                
              </Card.Body>            
            </Card>            
          </div>
          <div className='main-card col-lg-3 col-md-12 col-sm-12'>
            <Card style={{ width: '100%', textAlign:'center', backgroundColor: 'white'}}>
              <div className='card-picture d-flex flex-column'>
                <div className='d-flex justify-content-center'>
                  <Card.Img variant="" src={cali}/>                 
                </div>                              
              </div>                  
              {
                errorFail? (
                  <div>Hubo un error al cargar la información</div>
                ) : !isLoadedFail? (
                  <div>No se pudo consultar el clima</div>
                ) : (
                  <div>!!!</div>
                )
              }
              <Card.Body className='d-flex flex-column'>                
              </Card.Body>               
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Ver más</Accordion.Header>
                  <Accordion.Body>
                    La información presentada aquí es falsa.
                  </Accordion.Body>
                </Accordion.Item>                
              </Accordion>              
            </Card>
          </div>
        </div>            
      )}
  }
    
}

export default Main;
