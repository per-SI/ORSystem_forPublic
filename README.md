## 概要
#### 発注・入替システム
 接客やその他作業の傍ら、発注やレイアウト変更のサポートをするシステムです。
 発注書を作成し、発注書毎に商品の発注ができるシステムで、発注数によるランキング機能もあります。
 入替に関しては、事前のレイアウト変更とそのチェックができるよう、一時保存機能・一時保存呼出機能も備えています。
 こうすることで、手を離さないといけない時にも中断ができます。
 
#### 参考動画

## 機能一覧
- ログイン（laravel/ui）
- アイテム登録・削除（同期、非同期）
- ドラッグアンドドロップ（js）
- タッチデバイス用ドラッグアンドドロップ（js）
- 一時保存、復元、保存（js, 非同期）
- カレンダー、祝日表示（js, Google Calendar API）
- 発注、発注書表示、期間選択しての発注ランキング（js, 非同期）
- 新規ショップ作成、発注・入替フレームの追加・削除（php,js）
- 発注入替フレームのレイアウト調整（php,js）
- ローディング中アニメーション（CSS, js）

## 使用技術
- PHP 7.4.11
- Laravel 8.27.0
- MySQL(MariaDB)
- JavaScript（ajaxにはaxios）
- HTML5
- CSS3
- Bootstrap5
- AWS
  - VPC
  - EC2(t2.micro)
  - RDS(MySQL)
  - Elastic IP
- Apache
- Google Calendar API

## AWS構成図
<img width="600" height="500" alt="AWS-Diagram" src="https://user-images.githubusercontent.com/78603215/112346882-bb358100-8d09-11eb-8083-904aba89cd51.png">
