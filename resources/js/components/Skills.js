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
import IconGIT from './svg/git';


export default function Skills(){
    return (

        <div className="skills-container">

            <div className="skill-row">
                <div className="skill-title">フロントエンド(HTML, CSS, bootstrap, javascript, React)</div>
                <div className="skill-img-wrapper">
                    <IconHTML />
                    <IconCSS />
                    <IconBS />
                    <IconJS />
                    <IconREACT />
                </div>

                <div className="skill-text-wrapper">
                    <div className=".font-arapey skill-text">　JavaScriptが得意です。発注・レイアウトのシステムを作る上での要でしたが、独学かつ初心者であったため、非効率ではありましたが生のJSですべてコーディングした経験があります。<br/>　ここ最近はReactを触り始め、このサイトもReactでコーディングしています。Reactはモダンな技術に触れたくて選択しました。<br/>フロントエンドでのこだわりは、PCでもスマホでも見やすく使いやすいようにというのが自分の中では外せない条件だと思っています。ですので、レイアウト等に関してのコーディングもまだまだ勉強中です。</div>
                </div>

            </div>

            <div className="skill-row">
                <div className="skill-title">バックエンド(PHP, laravel, Node.js, Express)</div>
                <div className="skill-img-wrapper">
                    <IconPHP />
                    <IconLARAVEL />
                    <IconNODE />
                    <IconEXPRESS />
                </div>

                <div className="skill-text-wrapper">
                    <div className=".font-arapey skill-text">　Laravelを使っての開発が得意です。発注システムでもこのサイトでも、バックエンドに使っています。<br/>　はじめは発注システムをNode.jsで作っていたのですが、会社のシステム開発に合わせてLaravelで作り直しました。Laravelのほうが使用期間も長く、理解が深いのはこちらです。しかし2種類とも使ってみたことで、開発する上でのバックエンドの役割に関しても理解が進んだと思っています。</div>
                </div>

            </div>

            <div className="skill-row">
                <div className="skill-title">その他(MySQL, GIT, AWS EC2 RDS)</div>
                <div className="skill-img-wrapper">
                    <IconMYSQL />
                    <IconGIT />
                    <IconAWS />
                </div>

                <div className="skill-text-wrapper">
                    <div className=".font-arapey skill-text">　DBはMySQL、バージョン管理にはGitを用いて開発をしています。<br/>　サイトをはじめて公開したのはAWSで、こちらもReact同様、モダンな技術を使ってみたいという想いからでした。EC2で開発したため、Linuxの使用経験もあります。</div>
                </div>

            </div>

        </div>

    )
}
