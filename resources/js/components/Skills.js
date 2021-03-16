import React from 'react';
import IconHTML from './svg/html-5';
import IconCSS from './svg/css-3';
import IconAWS from './svg/aws';
import IconEXPRESS from './svg/express';
import IconJS from './svg/javascript';
import IconLARAVEL from './svg/laravel';
import IconMYSQL from './svg/mysql';
import IconNODE from './svg/nodejs';
import IconPHP from './svg/php';
import IconREACT from './svg/react';
import IconBS from './svg/bootstrap';


export default function Skills(){
    return (

        <div className="skills-container">

            <div className="skill-row">
                <div className="skill-title front-title">フロントエンド(HTML, CSS, bootstrap, javascript, React )</div>
                <div className="skill-img-wrapper">
                    <IconHTML />
                    <IconCSS />
                    <IconBS />
                    <IconJS />
                    <IconREACT />
                </div>

                <div className="skill-text-wrapper front-text">
                    <div className=".font-arapey skill-text">　JavaScriptが得意です。発注・レイアウトのシステムを作る上での要でしたが、独学かつ初心者であったため生のJSですべてコーディングした経験があります。<br/>　ここ最近はReactを触り始め、このサイトもReactでコーディングしています。<br/>また、PCでもスマホでも見やすく使いやすいようにというのは絶対条件だと思うので、レイアウト等に関してのコーディングもまだまだ勉強中です。</div>
                </div>

            </div>

            <div className="skill-row">
                <div className="skill-title back-title">バックエンド(PHP, laravel, Node.js, Express)</div>
                <div className="skill-img-wrapper">
                    <IconPHP />
                    <IconLARAVEL />
                    <IconNODE />
                    <IconEXPRESS />
                </div>

                <div className="skill-text-wrapper back-text">
                    <div className=".font-arapey skill-text">　Laravelを使っての開発が得意です。発注システムでもこのサイトでも、バックエンドに使っています。<br/>　はじめは発注システムをNode.jsで作っていたのですが、会社のシステム開発に合わせてLaravelで作り直しました。Laravelのほうが使用期間も長く、理解が深いほうはこちらです。</div>
                </div>

            </div>

          <div className="skill-row">
            <div className="col">
                <IconNODE />
                <IconEXPRESS />
                <IconLARAVEL />
            </div>
            <div className="col">
                <IconMYSQL />

            </div>
            <div className="col">
                <IconAWS />
            </div>
          </div>


            <div className="skill-row">
                <div>

                </div>
            </div>
            <div className="skill-row">
              <div className="col-8">col-8</div>
              <div className="col-4">col-4</div>
            </div>

        </div>

    )
}
