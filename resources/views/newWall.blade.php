<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link type="text/css" rel="stylesheet" href="{{asset('css/newWall.css')}}">
    <title>Create New Wall</title>
</head>
<body>
    <div class="header">
        <h2>Newラック作成</h2>
        <a href="/orderandreplace">shop選択に戻る</a>
    </div>

    <div id="selectContainer">

        <form id="selectForm" action="/orderandreplace/createNewWall" method="POST">
            @csrf
            <div id="nameANDname">
                <div class="shopNameContainer" style="margin-left:48px;">
                    SHOP:
                    <select name="shopSelected" id="shopSelected" onchange="previewSelect(event)">
                        <option value="notSelected">選択してください</option>
                        @foreach($shopList as $shop)
                        <option value="{{ $shop['shop'] }}">{{$shop["shop"]}}</option>
                        @endforeach
                    </select>
                </div>

                <div class="shopNameContainer hidden">
                    new SHOP：<input type="text" name="shopName" id="shopName">
                </div>

                <button type="button" id="SelectorNamerBTN" class="selectMode" onclick="changeMode(event)">新しいショップ</button>

            </div>

            <div id="wallNameContainer">
                ラック名：<input type="text" id="wallName" name="wallName">
            </div>

            <div id="QofXY">
                <div id="quantityOfRow">
                    <select name="QofRow" id="QofRow" onchange="previewRow(event)">
                        <option value="1">1</option>
                        @for( $i=2; $i<=50; $i++ )
                        <option value="{{$i}}">{{$i}}</option>
                        @endfor
                    </select>行
                </div>
                <div id="quantityOfColumn">
                    <select name="QofColumn" id="QofColumn" onchange="previewColumn(event)">
                        <option value="1">1</option>
                        @for( $i=2; $i<=50; $i++ )
                        <option value="{{$i}}">{{$i}}</option>
                        @endfor
                    </select>列
                </div>
            </div>
            <input type="submit" id="decideToCreate" value="作成" disabled="true">
        </form>

    </div>

    <div id="previewContainer">
        <div id="previewInfo">
            <div class="previewShopWall"><span id="previewShop"></span><span id="previewWall"></span></div>
        </div>
        <div id="previewXY">
            <div class="Y">
                <div class="X"></div>
            </div>
        </div>
    </div>

<script type="text/javascript" src="{{asset('js/newWall.js')}}"></script>

</body>
</html>
