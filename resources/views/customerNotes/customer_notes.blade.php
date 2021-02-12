<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>お客様注文一覧</title>
    <link rel="stylesheet" href="{{asset("css/customer_notes.css")}}">
</head>
<body>

    <header>
        <h3>お客様注文書　一覧</h3>
        <button onclick="">注文書作成</button>
    </header>

    <div id="customerNotes">
        <div class="infoTitles grid-parent">
            <div class="orderDateT">受付日</div>
            <div class="nameT">名前</div>
            <div class="shopT">受付店舗</div>
            <div class="recievingMethodT">配送店舗</div>
            <div class="commentT" onclick="">コメント</div>
        </div>
        @for($i=0; $i<count($customer_notes); $i++)

        <div class="notes grid-parent">
            <div class="orderDate">{{$customer_notes[$i]->id}}</div>
            <div class="name">{{$customer_notes[$i]->name}}</div>
            <div class="recievingMethod">{{$customer_notes[$i]->recieving_method}}</div>
            <div class="shop">{{$customer_notes[$i]->shop}}</div>
            <div class="comment">{{$customer_notes[$i]->comment}}</div>
        </div>

        @endfor
    </div>


    <script type="text/javascript" src="{{asset("js/customer_notes.js")}}"></script>
</body>
</html>
