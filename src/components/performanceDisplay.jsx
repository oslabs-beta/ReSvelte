import React, {useState} from 'react';
import '../styles.scss';
 

const performanceDisplay = (props) => {

  return (
    <div id='performanceDisplay'>
        <h1>App Performance</h1>

        <div id='mainContainer'>
          <div id='Top'>
            <div id='Graphs' className='display'>
              Graphs
            </div>
            <div id='Components' className='display' >
              Components
              <div id='componentStatsDisplays'>

                <div>
                  <p>Total Components</p>
                  {props.totalComponents}
                </div>


                <div>
                   <p>Re-rendering Components</p>
                  {props.totalRerendering}
                </div>

              </div>
            </div>
          </div>

          <div id='errorDisplay' className='display'>
          Error Log
          {props.errorLog}
          </div>
        </div>

    </div>
  );
};

export default performanceDisplay;