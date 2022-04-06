require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDom from 'react-dom';
import Root from './main/Root';
import "./i18n"
import { Helpers } from './common';
<style
    dangerouslySetInnerHTML={{
        __html: require('!css-loader!bootstrap/dist/css/bootstrap.min.css'),
    }}/> 


const appElement = document.getElementById('app');


ReactDom.render(<Root />, appElement);