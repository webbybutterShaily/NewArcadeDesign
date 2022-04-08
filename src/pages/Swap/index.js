import React, { useEffect, useRef, useState } from 'react';
import { Page } from '../../components'
import Chart from "react-apexcharts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

const testData = {"prices":[0,4,3,6,11],"dates":["2016","2017","2018","2019","2020"]};

const Swap = (props) => {
   
    const [chartState, setChartState] = useState(null);

    useEffect(() => {
        setChartState({ 
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false
                      }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    lineCap: 'butt',
                    width: 1,
                    dashArray: 0,  
                },
                grid: {
                    show: false,
                },
                colors:['#fece04'],
                  labels: testData.dates,
                //   xaxis: {
                //     type: 'datetime'
                //   },
                  yaxis: {
                    opposite: false
                  },
                  legend: {
                    horizontalAlign: 'left',
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      opacityFrom: 0.8,
                      opacityTo: 0.2,
                      shade:"dark",
                      shadeIntensity: 0.2,
                      stops: [10, 98, 100]
                    }
                  },
                  tooltip:{
                    custom: function({ series, seriesIndex, dataPointIndex, w }) {
                        
                        return (
                          '<div class="arrow_box">' +
                          "<div class='title'>" +
                          w.globals.categoryLabels[dataPointIndex] +
                          "</div><div class='value'>" +
                          series[seriesIndex][dataPointIndex] +
                          "</div>" +
                          "</div>"
                        );
                      }
                  }
                },
            series: [
              {
                name: "series-1",
                data: testData.prices
              }
            ]
          })
    },[]);

    return(
        <Page title="Swap">
            <div className='row'>
                <div className='col-sm-8'>
                    <div className='card shadow-widget'>
                        <div className='card-body px-0'>
                        <div className="card-header-title">
                            <h3 className="card-title text-center text-gradient">ARCADE Price</h3>
                        </div>
                    {chartState && 
                    <Chart
                        id="chart"
                        options={chartState.options}
                        series={chartState.series}
                        type="area"
                        height={"400"}
                        />}
                        </div>
                    </div>
                </div>
                <div className='col-sm-4'>
                    <div className='card shadow-widget'>
                        <div className='card-body '>
                            <div className="card-header-title">
                                <h3 className="card-title text-center text-gradient">ARCADE Price</h3>
                            </div>
                            <div className="dashboard-widget-body">
                                <div className="list-item">
                                    <div className="list-label">
                                        From
                                    </div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">
                                        To
                                    </div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">
                                        Slippage Tolerance
                                    </div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">
                                        Price
                                    </div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">
                                        Minimum Received    
                                    </div>
                                </div>
                                <div className="list-item">
                                    <div className="list-label">
                                    ARCADE FEE
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 text-center'>
                                <a href='#' className='btn btn-action px-4'>
                                    <FontAwesomeIcon icon={faExchangeAlt}/>
                                    <span>SWAP</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default Swap;