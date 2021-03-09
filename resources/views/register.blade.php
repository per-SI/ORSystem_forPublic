<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link type="text/css" rel="stylesheet" href="{{asset('css/register.css')}}">
    <title>itemsに登録</title>
</head>
<body>
    <h1>デザイン登録</h1>
    <button id="openCheckbox" class="openCheckbox" onclick="showCheckbox(event)">ステッカー削除</button>

    <div id="datalist">
        @for( $i=0; $i<count($gazou); $i++ )
        <div class="dataInfo">
            <div class="code">{{$code[$i]}}</div>
            <div class="name">{{$name[$i]}}</div>
            <div class="number">{{$number[$i]}}</div>
            <div class="gazou"><img class="stickerImg" src="{{asset('storage/img'.'/'.$gazou[$i])}}" alt=""></div>
        </div>
        @endfor
    </div>

        <div class="upload-container">
            <form id="uploadForm" action="/upload" method="POST" enctype="multipart/form-data">
                @csrf
                @for( $i=0; $i<20; $i++ )
                <input class="registerName" type="hidden" name="stickerName[]" value="">
                <input class="registerNumber" type="hidden" name="stickerNumber[]" value="">
                <input class="registerGazou" type="hidden" name="stickerGazou[]" value="">
                <input class="registerSort" type="hidden" name="stickerSort[]" value="">
                @endfor
                <div class="accept-wrapper">
                    イメージを選択<br>or<br>イメージをここにドラッグ
                    <input required type="file" id="register" name="files[]" onchange="preview(this)" multiple="multiple">
                </div>
                <input id="decide" type="submit" value="登録する" disabled="true">
            </form>
        </div>


    <div id="previewContainer">
    </div>

    <div id="deleteContainer" class="deleteContainer hidden" >
        <form action="/delete" method="POST">
            @csrf
            @for( $i=0; $i<count($gazou); $i++ )
            <input type="checkbox" class="checkbox" name="deleteNum[]" value="{{$i+1}}" onchange="check(this)">
            @endfor
            <input id="delete" type="submit" value="削除" disabled="true">
        </form>
    </div>

    <div id="coverPage" class="nocover">
    </div>


    <script type="text/javascript" src="{{asset('js/register.js')}}" ></script>
    <script type="text/javascript" src="{{asset('js/deleteNewStickers.js')}}" ></script>

</body>
</html>
