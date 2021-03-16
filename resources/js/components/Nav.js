import React, {useState} from 'react';
import { BrowserRouter, Route, Link, Router } from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import Profile from './Profile';
import Portfolio from './Portfolio';
import Skills from './Skills';
import Contact from './Contact';

const links = [
    {name:'PROFILE', className:'main-content position-absolute top-50 left-50 shadow-lg rounded profile', path:'/profile', Component:Profile},
    {name:'PORTFOLIO', className:'main-content position-absolute top-50 left-50 shadow-lg rounded portfolio', path:'/portfolio', Component:Portfolio},
    {name:'SKILLS', className:'main-content position-absolute top-50 left-50 shadow-lg rounded skills', path:'/skills', Component:Skills},
    {name:'CONTACT', className:'main-content position-absolute top-50 left-50 shadow-lg rounded contact', path:'/contact', Component:Contact}
]

export default function Nav(){

    return(
        <div>
            <BrowserRouter>
                <div className="position-absolute top-0 start-0 nav-menu">
                  <div className="row row-cols-2">
                      {links.map(({name,path})=>(
                        <div key={name} className="col font-arapey"><Link className="text-decoration-none link" to={path}>{name}</Link></div>
                      ))}
                  </div>
                </div>

                <div className="position-absolute top-50 start-50 transform-middle">
                    {links.map(({name, className, path, Component})=>(
                        <Route key={name} path={path} exact>
                            {({match})=>(
                                <CSSTransition
                                in={match != null}
                                timeout = {1000}
                                classNames = 'main-content'
                                unmountOnExit
                                >
                                    <div className={className}>
                                        <Component />
                                    </div>
                                </CSSTransition>
                            )}
                        </Route>
                    ))}
                </div>
            </BrowserRouter>
        </div>
    )

}

