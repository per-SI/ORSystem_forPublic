<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>レイアウト変更</title>
    <link type="text/css" rel="stylesheet" href="{{asset("css/changeWall.css")}}">
</head>
<body>
    <h1>レイアウト変更 </h1>
    <h4>ショップ：{{$shop}}　ラック：{{ $wall }}</h4>
    <a href="/ORsystem/{{ $shop }}">発注・入替に戻る</a>




        <div id="display">
            <button class="changeToDelete" onclick="changeBtn()">行列削除</button>
            <button class="add rowcolumn top" onclick="Top()">＋</button>
            <button class="add rowcolumn bottom" onclick="Bottom()">＋</button>
            <button class="add rowcolumn left" onclick="Left()">＋</button>
            <button class="add rowcolumn right" onclick="Right()">＋</button>

            <div id="mainzone">
                @php $k=0 @endphp
                @for( $i=0; $i<$rowLength["max(y)"]; ++$i )

                    <div class="Row Row{{ $i }}" id="Row{{ $i }}">

                    @for( $j=0; $j<$columnLength[$i]["max(x)"]; ++$j )

                        @if( $main[$k]["code"] !== -1 && $main[$k]["code"] !== -2 )

                        <div class="main column row{{ $i }} column{{ $j }} imgParent"
                             id="row{{ $i }}column{{ $j }}" x="{{ $j }}" y="{{ $i }}" draggable="false"
                        >
                           <img class="stickerImg touchable" id="{{$j}},{{$i}}"

                                code="{{$main[$k]['code']}}"

                                number="{{$main[$k]['number']}}"

                                name="{{$main[$k]['number']}}"

                                src="{{asset('storage/img/'.$main[$k]["gazou"])}}"

                                x="{{ $j }}" y="{{ $i }}"

                                draggable="false"
                           >
                           <button class="showANDhide hide" x="{{$j}}" y="{{$i}}" onclick="hide(event)"></button>
                        </div>

                        @elseif( $main[$k]["code"] == -1 )

                        <div class="main column row{{ $i }} column{{ $j }} imgParent"
                             id="row{{ $i }}column{{ $j }}" x="{{ $j }}" y="{{ $i }}"
                        >
                           <img class="stickerImg touchable" id="{{$j}},{{$i}}" code="-1"
                                x="{{ $j }}" y="{{ $i }}"
                                draggable="false"
                           >
                           <button class="showANDhide hide" x="{{$j}}" y="{{$i}}" onclick="hide(event)"></button>
                        </div>

                        @else

                        <div class="main column row{{ $i }} column{{ $j }} imgParent hidden"
                             id="row{{ $i }}column{{ $j }}" x="{{ $j }}" y="{{ $i }}"
                        >
                           <img class="stickerImg" id="{{$j}},{{$i}}"
                                x="{{ $j }}" y="{{ $i }}"
                                draggable="false"
                           >
                           <button class="showANDhide show" x="{{$j}}" y="{{$i}}" onclick="show(event)"></button>
                        </div>

                        @endif
                        @php ++$k @endphp
                    @endfor

                    </div>

                @endfor

                </div>


            <div id="coverPage" class="cover-page" onclick="changeBtn()"></div>

        </div>





    <form id="saveLayout" action="/orderandreplace/saveLayout/{{$shop}}/{{$wall}}/{{$rowLength["max(y)"]}}/{{$columnLength[0]["max(x)"]}}" method="POST">
        @csrf
        <input type="hidden" name="Hx" value="" id="hiddenX">
        <input type="hidden" name="Hy" value="" id="hiddenY">
        <input type="hidden" name="Sx" value="" id="spaceX">
        <input type="hidden" name="Sy" value="" id="spaceY">
        <div class="newWallName">
            面の名前を変更する場合は入力
            <input type="text" placeholder="{{$wall}}" name="wallNewName">面
        </div>
        <input type="submit" value="SAVE">
    </form>

    <form id="deleteWallForm" action="/orderandreplace/deleteWall" method="POST">
        @csrf
        ラックを削除する場合はこちら
        <input type="hidden" name="shop" value="{{$shop}}">
        <input type="hidden" name="wall" value="{{$wall}}">
        <div class="deleteAgreementContainer">
            このラックを削除する場合はチェック
            <input type="checkbox" id="deleteAgreement" onchange="changeDisabled(event)">
        </div>
        <input id="deleteModalBTN" type="button" disabled="true" value="削除する" onclick="openModal()">

        <div id="alertModal" class="alertModal">
            本当に削除しますか？
            <input class="yesnoBTN" type="submit" value="削除">
            <input class="yesnoBTN" type="button" value="やめる" onclick="closeModal()">
        </div>

        <div id="cover2" class="cover2" onclick="closeModal()"></div>

    </form>

<script type="text/javascript" src="{{asset("js/changeWall.js")}}"></script>
<script type="text/javascript" src="{{asset("js/deleteWall.js")}}"></script>

</body>
</html>
