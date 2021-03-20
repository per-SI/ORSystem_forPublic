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
                <div className="work-introduction">
                    <div className="heading1">なぜ作ったのか</div>
                    <div className="intro-sentence1">　エンジニアとして前に進むために作りました。</div>
                    <div className="heading1">作る上で大事にしたポイント</div>
                    <div className="intro-sentence1">　自分の紹介ページなので、できるだけ多くの人に読んでもらいやすくするため、シンプルな構造にしました。<br />　また、何の紹介を読んでいるか感覚的に理解できればと、コンポーネント毎に配色を少し変えたりもしました。</div>
                    <div className="heading1">技術</div>
                    <div className="intro-sentence1">　Reactです。プログラムの構成自体は本当にシンプルに仕上がっています。<br />　使用ライブラリもシンプルで、動きを出すためのreact-transition-group、ページのリロードに対応するためにreact-router-domを使っています。<br />　CSSでのレイアウトはgridを用いて、レスポンシブ対応させています。</div>
                </div>
                <div className="mysite-link"><a href="https://p.explanewworld.com/top">TopLink</a></div>
                <div className="github-ling"><a href="">GitHub</a></div>
            </div>

            <div className="ORS-wrapper">
                <div className="work-title">ORSystem</div>
                <div className="img-lists">
                    <video className="ORS-mov" autoPlay muted playsInline controls src='/img/portfolio-mov/ORS-mov1.mp4' width="500" height="300"/>
                    <video className="ORS-mov" autoPlay muted playsInline controls src='/img/portfolio-mov/ORS-mov2.mp4' width="500" height="300"/>
                    <video className="ORS-mov" autoPlay muted playsInline controls src='/img/portfolio-mov/ORS-mov3.mp4' width="500" height="300"/>
                    <video className="ORS-mov" autoPlay muted playsInline controls src='/img/portfolio-mov/ORS-mov4.mp4' width="500" height="300"/>
                </div>
                <div className="work-introduction">
                    <div className="heading2">なぜ作ったのか</div>
                    <div className="intro-sentence2">　所属している会社の店舗に立っていて、こういうシステムがあれば便利だろうなと、ふと思ったのがきっかけです。</div>
                    <div className="heading2">システムの必要性</div>
                    <div className="intro-sentence2">　商品の入替・発注で、店舗に特化させたものを作ることで、作業効率を上げ、他に費やせる時間を作り出すことができる。(とりわけ商品数がかなり多いため、かなり効率化される。)</div>
                    <div className="heading2">システムのポイント</div>
                    <div className="intro-sentence2">　スタッフへの質問等から、導入するとなると、今までアナログで入替していたときの感覚に近いものが必要そうでした。ですので、実際の壁面上の商品がデバイスの画面上に表示されているかのようなUIにしました。そこにある商品をタップするような感覚での発注が、手にもっている商品と壁面上の商品とで、実際に入替しているような感覚での入替が可能。<br />　また、システム部の方と少し相談もし、店舗以外で使い続けるであろう既存のシステムとも、互換性があるように設計しました。<br />　システム全体としてはSPAではないですが、メインで使う発注・入替ページは、実用性を求めてSPAとして設計しています。</div>
                    <div className="heading2">技術</div>
                    <div className="intro-sentence2">　はじめて作ったWEBアプリでしたので、生のJavaScriptで書きました。タッチデバイス用のドラッグアンドドロップも生のJSで実装しています。<br />　バックエンドにlaravel、ページのレンダリングはBladeテンプレートで。フロントエンドはCSSとJSです。</div>
                </div>
                <div className="mysite-link"><a href="https://p.explanewworld.com/orderandreplace">デモページへ</a></div>
                <div className="github-ling"><a href="">GitHub</a></div>
            </div>
        </div>
    );
}
