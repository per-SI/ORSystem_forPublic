<div class="sheetModal" id="sheetModal">
    <div id="newSheetContainer" class="newSheetContainer">
        <div class="newSheetInfo">
            <div class="NSinfo1">納期　 ：</div>
            <div class="NSinfo2" style="height:3vh;"><div id="deliveryDate">カレンダーから選択</div><img src="{{asset("calenderIcon.png")}}" alt="" id="openCalendar" height="120%" onclick="openCalendar(event)"></div>
        </div>
        <div class="newSheetInfo">
            <div class="NSinfo1">納品方法：</div>
            <div class="NSinfo2"><select name="deliveryMethod" id="deliveryMethod">
                <option value="配送">配送</option>
                <option value="手持ち">手持ち</option>
            </select></div>
        </div>
        <div class="newSheetInfo">
            <div class="NSinfo1">事務所　：</div>
            <div class="NSinfo2"><select name="shipmentSource" id="shipmentSource">
                <option value="tokyo">東京</option>
                <option value="osaka">大阪</option>
            </select></div>
        </div>
        <div class="">
            <div class="NSinfo1">その他コメント　　　   </div>
            <div class="NSinfo3"><textarea id="sheetComment" rows="4" placeholder="その他必要があれば記入してください" style="resize:none; width:98%; margin-left:3px;"></textarea></div>
        </div>
        <button id="createNSBTN" onclick="createSheet()">作成</button>

    </div>

    <div id="selectSheetContainer" class="selectSheetContainer">
        発注書を選択してください。
        <div id="infoTitles">
            <div class="sheetinfoT SI">No.</div>
            <div class="sheetinfoT SI">作成日</div>
            <div class="sheetinfoT SI">店舗</div>
            <div class="sheetinfoT SI">納期</div>
            <div class="sheetinfoT">選択</div>
        </div>
    </div>
</div>

<div id="orderSheetInfoModal" class="orderSheetInfoModal">
    <div id="sheetInfomation"></div>
    <div id="contentTitles">
        <div class="sheetinfoT">品番</div>
        <div class="sheetinfoT">名前</div>
        <div class="sheetinfoT">数量</div>
    </div>
</div>

<div id="coverPage2" class="coverPage2" onclick="closeSheet(event)"></div>
