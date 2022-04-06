import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

/** pages component */
import { 
  Rangking,
  Dashboard,
  Warchest,
  Rewards,
  Swap,
  SingleAssetStaking,
  MissionPools
} from '../pages';
import { CustomRoutes } from '../components'

const BaseRoute = () =>{
    return(
      
         <CustomRoutes>
            <Route path="/ranking" element={<Rangking/>}/>
            <Route path="/warchest" element={<Warchest/>}/>
            <Route path="/rewards" element={<Rewards/>}/>
            <Route path="/swap" element={<Swap/>}/>
            <Route path="/single-asset-staking" element={<SingleAssetStaking/>}/>
            <Route path="/mission-pools" element={<MissionPools/>}/>
            <Route exact path="/" element={<Dashboard />}/>
        </CustomRoutes>
    );
}

export default BaseRoute;