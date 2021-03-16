import React from 'react';

export default function Profile(){
    return (
        <div className="profile-container">
            <div className="profile-img"></div>
            <div className="self-introduction">
                <div className="self-name font-arapey">Satoi Inagaki</div>
                <div className="self-address font-arapey">Tokyo (from Kansai)</div>
            </div>
            <div className="self-career">
                <div className="career-title">これまでの道のり</div>
                <div className="career-text-container ctc1">
                    <div className="career-text date-text">2013/3　兵庫県立大学 理学部生命科学科 中退</div>
                    <div className="career-text">その後フリーター生活を得て、</div>
                    <div className="career-text date-text">2020/3　いまの会社で働き始める。(店舗統括マネージャー補佐)</div>
                    <div className="career-text">フリーターのときに得た経験を活かして、店舗オペレーションの改善や育成に携わる。</div>
                </div>
                <div　className="career-text-container ctc2">
                    <div className="career-text">そんな中、商品の種類数（デザイン数）が非常に多いため、毎月の商品の入替とレイアウト考案、発注時間の短縮に改善点を見出す。</div>
                    <div className="career-text date-text">2020/7　プライベートの時間を使い、思いついた発注システムを作ってみたい一心で、独学でプログラムを学び始める。</div>
                    <div className="career-text">基本的にはタブレットやスマホで使うシステムのため、タッチイベントの実装に少し苦労しつつも、生のJSでSPAのシステム制作を始める。</div>
                    <div className="career-text date-text">2021/2　引き渡せばテスト可能な状態に至る。（現在システム担当の方に相談中）</div>
                    <div className="career-text">また、ローカル環境でHTML,CSS,JSだけで動く翌月毎日のの売上目標計算ツールも制作。</div>
                    <div className="career-text">（エクセルシートを読み込んで、客数予測・単価目標と曜日ごとの傾向から、翌月の売上目標を計算、エクセルシートもＤＬできるツール）</div>
                </div>
                <div　className="career-text-container ctc3">
                    <div className="career-text date-text">2021/3　プログラムを使っての「誰かの役に立つモノづくり」に取り組んでいるとき、心から自分が楽しめていることに気づき、エンジニアとしてやっていくことを決心。</div>
                    <div className="career-text">そして学びが進んだいま、このポートフォリオサイトを、ずっと触りたかったReactで制作。</div>
                </div>
            </div>
        </div>
    );
}
