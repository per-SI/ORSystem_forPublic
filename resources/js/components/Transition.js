import React,{useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import Nav from './Nav';


// welcomeのフェードアウト
const Fadeout = ({ show, children,...callBack }) => (
    <CSSTransition
      in={show}
      timeout={2500}
      unmountOnExit
      classNames="welcome-fade"
      {...callBack}
    >
      <div className="welcome-fade">
          {children}
      </div>
    </CSSTransition>
);

// Messageのフェードイン
const Fadein = ({ show, children,...callBack }) => (
    <CSSTransition
      in={show}
      timeout={4000}
      unmountOnExit
      classNames="message-fade"
      {...callBack}
    >
      <div className="message-fade">
          {children}
      </div>
    </CSSTransition>
);

// navのスライド
const Slide = ({ show, children,...callBack }) => (
    <CSSTransition
      in={show}
      timeout={3000}
      unmountOnExit
      classNames="nav-slide"
      {...callBack}
    >
      <div className="nav-slide">
          {children}
      </div>
    </CSSTransition>
);

const Transition = () => {
    const [nav, setNav] = useState(false);
    const [welcome, setWelcome] = useState(true);
    const [message, setMessage] = useState(false);

    useEffect(()=>{
        setNav(true);
        setWelcome(false);
        setMessage(true);
    });

    return (
        <div id="transition">
            <Fadeout
                show={welcome}
                onEntered={()=>{}}
                onExited={()=>{}}
            >
                <p className="welcome position-absolute top-50 start-50 translate-middle font-arapey">Welcome to My First Page</p>
            </Fadeout>

            <Fadein
                show={message}
                onEntered={()=>{}}
                onExited={()=>{}}
            >
                <div>
                <p className="top-message1 position-absolute top-50 start-50 font-arapey"><span className="message-p">P</span>'s Portfolio-Site</p>
                <p className="top-message2 position-absolute top-50 start-50 font-arapey"><span className="message-e">-E</span>xplore <span className="message-a">A </span> <span className="message-nw">N</span>ew <span className="message-nw">W</span>orld-</p>
                </div>
            </Fadein>

            <Slide
              show={nav}
              onEntered={() => {}}
              onExited={() => {}}
            >
                <Nav />
            </Slide>
      </div>
    );
};

export default Transition;
