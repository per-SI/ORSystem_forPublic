import React from 'react';

export default function PortFolio(){
    return (
        <div className="portfolio-container">
            <div className="PPS-wrapper">
                <div className="work-title">P's Portfolio-Site</div>
                <div className="img-lists">
                    <div className="work-img PPS-img1"></div>
                    <div className="work-img PPS-img3"></div>
                    <div className="work-img PPS-img2"></div>
                    <div className="work-img PPS-img4"></div>
                </div>
                <div className="work-introduction">仮の説明文　ABCDEFGHIJKLMNOPQRSTUVWXYZ あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん</div>
            </div>

            <div className="ORS-wrapper">
                <div className="work-title">ORSystem</div>
                <div className="img-lists">
                    <video className="ORS-mov" autoPlay muted playsInline controls src='/img/portfolio-mov/ORS-mov1.mp4' width="500" height="300"/>
                    <video className="ORS-mov" autoPlay muted playsInline controls src='/img/portfolio-mov/ORS-mov2.mp4' width="500" height="300"/>
                    <video className="ORS-mov" autoPlay muted playsInline controls src='/img/portfolio-mov/ORS-mov3.mp4' width="500" height="300"/>
                    <video className="ORS-mov" autoPlay muted playsInline controls src='/img/portfolio-mov/ORS-mov4.mp4' width="500" height="300"/>
                </div>
                <div className="work-introduction">仮の説明文　ABCDEFGHIJKLMNOPQRSTUVWXYZ あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん</div>
            </div>
        </div>
    );
}
