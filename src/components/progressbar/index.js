import React from 'react';
import TopBarProgress from "react-topbar-progress-indicator";
 
TopBarProgress.config({
  barColors: {
    "0": "#F2EC0D",
    "0.3":"#f972b0",
    "1.0": "#8355ff"
  },
  shadowBlur: 5
});
 
const ProgressBar = (props) => {
  return <div>{props.loading && <TopBarProgress />}</div>;
};

ProgressBar.defaultProps  = {
    loading :false
}

export default ProgressBar;