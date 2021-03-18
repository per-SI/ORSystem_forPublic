<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ラック</title>
    <link type="text/css" rel="stylesheet" href="/samplefiles/sample.css">
    <link type="text/css" rel="stylesheet" href="/samplefiles/manageXY.css">
</head>
<body>
  <header>

        <h1>Order & Replace</h1>

        <div id="option">

            <div class="tab-container">
                <button id="order" class="tab active" >発注</button>
                <button id="changeDisplay" class="tab" >入替</button>
            </div>
            <form action="/sample/<%= currentWall %>" method="GET" id="SelectWall">
                <select name="wallNumber" id="wallNumber" onchange="SetNumber(this)">
                    <option value="<%= currentWall %>"><%= currentWall %>面</option>
                    <% for(let i=0; i<wallLength; i++){ %>
                        <option value="<%= i+1 %>"><%= i+1 %>面</option>
                    <% } %>
                </select>
                <input type="submit" value="移動">
            </form>

        </div>

    </header>

    <div id="display">

        <div id="mainZone">
            <% for(let r=0; r<items.length; r++){ %>
                <div class="Row Row<%= r %>">
                    <% for(let c=0; c<items[r].length; c++){ if(items[r][c][3] !== undefined){ %>

                        <div class="main column row<%= r %> column<%= c %>" id="row<%= r %>column<%= c %>" x="<%= c %>" y="<%= r %>">
                            <img class="stickerImg" id="<%= r+","+c %>"
                                itemid="<%= items[r][c][0] %>"      itemNumber="<%= items[r][c][1] %>"
                                src="/img/<%= items[r][c][3] %>"    name="<%= items[r][c][2] %>"
                                src2="/img/<%= items[r][c][5] %>"   name2="<%= items[r][c][4] %>"
                                src3="/img/<%= items[r][c][7] %>"   name3="<%= items[r][c][6] %>"
                                src4="/img/<%= items[r][c][9] %>"   name4="<%= items[r][c][8] %>"
                                src5="/img/<%= items[r][c][11] %>"  name5="<%= items[r][c][10] %>"
                                src6="/img/<%= items[r][c][13] %>"  name6="<%= items[r][c][12] %>"
                                src7="/img/<%= items[r][c][15] %>"  name7="<%= items[r][c][14] %>"
                                x="<%= c %>" y="<%= r %>"
                                draggable="false" onclick="openModal(event)" ondragstart="dragStarted(event)" ondragover="dragOver(event)" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondrop="drop(event)"
                            >
                        </div>

                    <% }else{ %>

                        <div  class="main column row<%= r %> column<%= c %>" id="row<%= r %>column<%= c %>" x="<%= c %>" y="<%= r %>">
                            <img
                                 class="stickerImg" id="<%= r+","+c %>" x="<%= c %>" y="<%= r %>"
                                 draggable="false" onclick="openModal(event)" ondragstart="dragStarted(event)" ondragover="dragOver(event)" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondrop="drop(event)"
                            >
                        </div>

                    <% }} %>
                </div>
            <% } %>
        </div>

        <div id="newZone">

        </div>

    </div>

    <div id ="manageXY" >

        <form id="deleteCellForm" action="/orderandreplace/deleteCell">
            <% const arrofColumnLength = [];
                for(let i=0; i<items.length; i++){
                    arrofColumnLength.push(items[i].length);
                };
                const maxX = arrofColumnLength.reduce((acc,value)=>(acc>value ? acc : value));
                const AmmountOfItems = maxX*items.length;
                for(let i=0; i<AmmountOfItems ; i++){ %>
                    <input type="checkbox">
            <% } %>
        </form>


        <button>追加</button>
        <button>列の削除</button>

    </div>



    <script type="text/javascript" src="/samplefiles/sampleDnD.js"></script>
    <script type="text/javascript" src="/samplefiles/sample.js"></script>




</body>
</html>
