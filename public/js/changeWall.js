const $mainZone=  document.getElementById("mainzone");
let $btn = document.getElementsByClassName("rowcolumn");
let $imgParent = document.getElementsByClassName("imgParent");

let topRowAdded = 0 ; let topRowDeleted = 0 ; let topOriginalDeleted = 0 ;
let bottomRowAdded = 0 ; let bottomRowDeleted = 0 ; let bottomOriginalDeleted = 0 ;
let leftColumnAdded = 0 ; let leftColumnDeleted = 0 ; let leftOriginalDeleted = 0 ;
let rightColumnAdded = 0 ; let rightColumnDeleted = 0 ; let rightOriginalDeleted = 0 ;

function changeBtn(){
    let $changeBTN = document.getElementsByClassName("changeToDelete")[0];
    let $cover = document.getElementById("coverPage");
    if($changeBTN.classList.contains("on")){
        $changeBTN.classList.remove("on");
        $cover.classList.remove("cover");
        for( let i=0; i<$btn.length; i++){
            $btn[i].classList.remove("delete");
            $btn[i].classList.add("add");
            $btn[i].innerHTML = "＋";
        }
    }else{
        $changeBTN.classList.add("on");
        $cover.classList.add("cover");
        for( let i=0; i<$btn.length; i++){
            $btn[i].classList.remove("add");
            $btn[i].classList.add("delete");
            $btn[i].innerHTML = "－";
        }
    }

}


function setHiddenXY(){
    let hiddenX = "" ;  let spaceX = "" ;
    let hiddenY = "" ;  let spaceY = "" ;
    let $changed = document.getElementsByClassName("changed");
    let j = $changed.length;
    for( let i=0; i<j; i++ ){
        if($changed[i].classList.contains('hidden')){
            let X = Number($changed[i].getAttribute('x'))+1;
            let Y = Number($changed[i].getAttribute('y'))+1;
            hiddenX += X+"," ;
            hiddenY += Y+"," ;
        }else{
            let X = Number($changed[i].getAttribute('x'))+1;
            let Y = Number($changed[i].getAttribute('y'))+1;
            spaceX += X+"," ;
            spaceY += Y+"," ;
        }
    }
    hiddenX = hiddenX.slice(0,-1);  spaceX = spaceX.slice(0,-1);
    hiddenY = hiddenY.slice(0,-1);  spaceY = spaceY.slice(0,-1);
    console.log(hiddenX+","+hiddenY);
    console.log(spaceX+","+spaceY);
    document.getElementById("hiddenX").setAttribute('value',hiddenX) ;
    document.getElementById("hiddenY").setAttribute("value",hiddenY) ;
    document.getElementById("spaceX").setAttribute('value',spaceX) ;
    document.getElementById("spaceY").setAttribute('value',spaceY) ;
}

function hide(event){
    event.target.setAttribute("onclick","show(event)");
    event.target.parentNode.classList.add("hidden");
    if(event.target.parentNode.classList.contains("changed")){
        event.target.parentNode.classList.remove("changed");
    }else{
        event.target.parentNode.classList.add("changed");
    }
    event.target.parentNode.firstElementChild.style.opacity = "0.1";
    setHiddenXY();
}

function show(event){
    event.target.setAttribute("onclick","hide(event)");
    event.target.parentNode.classList.remove("hidden");
    if(event.target.parentNode.classList.contains("changed")){
        event.target.parentNode.classList.remove("changed");
    }else{
        event.target.parentNode.classList.add("changed");
    }
    event.target.parentNode.firstElementChild.style.opacity = "0.6";
    setHiddenXY();
}


function addRow(TOPorBOTTOM){
    let rownum = topRowAdded + bottomRowAdded - topRowDeleted - bottomRowDeleted + topOriginalDeleted + bottomOriginalDeleted ;
    newRow = document.createElement("div");
    newRow.setAttribute("class","Row ROWNEW RowNEW"+ rownum);
    newRow.id = "RowNEW"+rownum ;
    let $column = $mainZone.firstElementChild.children ;
    for(let i=0; i<$column.length; i++){
        if( $column[i].classList.contains("COLUMNNEW") ){
            let columnnum = $column[i].classList[4].replace("columnNEW","");
            newRow.innerHTML += '<div class="main column COLUMNNEW rowNEW'+ rownum +' columnNEW'+ columnnum +' imgParent " id="rowNEW'+rownum +'columnNEW'+ columnnum +'">  <img class="stickerImg" id="columnNEW'+ columnnum +',rowNEW'+ rownum +'">  <button class="showANDhide hide"  onclick="hide(event)"></button></div>' ;
        }else{
            let columnnum = $column[i].classList[3].replace("column","") ;
            newRow.innerHTML += '<div class="main column rowNEW'+ rownum +' column'+ columnnum +' imgParent " id="rowNEW'+rownum +'column'+ columnnum +'">  <img class="stickerImg" id="'+ columnnum +',rowNEW'+ rownum +'">  <button class="showANDhide hide" onclick="hide(event)"></button></div>' ;
        }
    }
    if(TOPorBOTTOM == "TOP"){
        $mainZone.insertBefore(newRow,$mainZone.firstElementChild);
        topRowAdded ++;
    }else if(TOPorBOTTOM == "BOTTOM"){
        $mainZone.insertBefore(newRow,null);
        bottomRowAdded ++;
    }
}

function deleteRow(TOPorBOTTOM){
    function ForL(){
        if(TOPorBOTTOM == "TOP"){
            $mainZoneChild = $mainZone.firstElementChild ;
        }else if(TOPorBOTTOM == "BOTTOM"){
            $mainZoneChild = $mainZone.lastElementChild ;
        }
        return $mainZoneChild ;
    }
    if(ForL().classList.contains("ROWNEW")){
        let $NEWROW = document.getElementsByClassName("ROWNEW");
        let deleteTargetNum = ForL().id ;
        let deleteNum = Number(deleteTargetNum.replace("RowNEW","")); //数字部分を保存
        for( let i=0; i<$NEWROW.length; i++){
            let number = Number($NEWROW[i].id.replace("RowNEW",""));　//$ROWNEW[i]のXを保存
            if( number>deleteNum ){

                let replacedNum = number - 1 ;
                $NEWROW[i].id = "RowNEW"+replacedNum;
                $NEWROW[i].classList.remove("RowNEW"+number);
                $NEWROW[i].classList.add("RowNEW"+replacedNum);
                let rowNEW = "rowNEW" + number ;
                regexp = new RegExp(rowNEW,'g');
                let innerText = $NEWROW[i].innerHTML.replace(regexp,"rowNEW"+replacedNum) ;
                $NEWROW[i].innerHTML = innerText ;

            }
        }

    }else{
        if(TOPorBOTTOM == "TOP"){
            topOriginalDeleted++ ;
        }else if(TOPorBOTTOM == "BOTTOM"){
            bottomOriginalDeleted++ ;
        }
    }
    ForL().outerHTML = "" ;
    if(TOPorBOTTOM == "TOP"){
        topRowDeleted++ ;
    }else if(TOPorBOTTOM == "BOTTOM"){
        bottomRowDeleted++ ;
    }
}

function addColumn(firstORlast){
    function ForL(){
        if( firstORlast == "first" ){
            return nowRow.firstElementChild;
        }else{
            return null;
        }
    }
    let rowLength = document.getElementById("mainzone").childElementCount;
    let rownum = topRowAdded + bottomRowAdded - topRowDeleted - bottomRowDeleted + topOriginalDeleted + bottomOriginalDeleted ;
    let columnnum = leftColumnAdded + rightColumnAdded -leftColumnDeleted - rightColumnDeleted + leftOriginalDeleted + rightOriginalDeleted ;
    for( let i=0; i<rowLength; i++){
        let newColumn = document.createElement("div");
        let j = i + topOriginalDeleted ;
        if(document.getElementById("Row"+j)){
            nowRow = document.getElementById("Row"+j);
            nowRow.insertBefore(newColumn,ForL());
            newColumn.outerHTML = '<div class="main column row'+ i +' COLUMNNEW columnNEW'+ columnnum +' imgParent " id="row'+ i +'columnNEW'+ columnnum +'" x="columnNEW'+ columnnum +'" y="'+ i +'">  <img class="stickerImg" id="columnNEW'+ columnnum +','+ i +'" x="columnNEW'+ columnnum +'" y="'+ i +'"  >  <button class="showANDhide hide" x="columnNEW'+ columnnum +'" y="'+ i +'" onclick="hide(event)"></button></div>' ;
        }else{
            let j = i-rowLength+rownum ;
            nowRow = document.getElementById("RowNEW"+j);
            nowRow.insertBefore(newColumn,ForL());
            newColumn.outerHTML = '<div class="main column ROWNEW rowNEW'+ j +' COLUMNNEW columnNEW'+ columnnum +' imgParent " id="rowNEW'+ j +'columnNEW'+ columnnum +'" x="columnNEW'+ columnnum +'" y="rowNEW'+ j +'">  <img class="stickerImg" id="columnNEW'+ columnnum +',rowNEW'+ j +'" x="columnNEW'+ columnnum +'" y="rowNEW'+ j +'"  >  <button class="showANDhide hide" x="columnNEW'+ columnnum +'" y="rowNEW'+ j +'" onclick="hide(event)"></button></div>' ;
        }
    }
}

function deleteColumn(LEFTorRIGHT){
    let $Row = document.getElementsByClassName("Row");

    function ForL(i){
        if(LEFTorRIGHT == "LEFT"){
            $RowChild = $Row[i].firstElementChild ;
        }else if(LEFTorRIGHT == "RIGHT"){
            $RowChild = $Row[i].lastElementChild ;
        }
        return $RowChild ;
    }

    if(ForL(0).classList.contains("COLUMNNEW")){
        let $COLUMNNEW = document.getElementsByClassName("COLUMNNEW");
        let deleteTargetNum = ForL(0).id ;
        let deletenum = Number(document.getElementById(deleteTargetNum).classList[4].replace("columnNEW","")) ;
        for( let i=0; i<$COLUMNNEW.length; i++){
            let number = Number($COLUMNNEW[i].classList[4].replace("columnNEW","")) ;
            if(number>deletenum){

                let replacedNum = number - 1 ;
                let columnNEW = "columnNEW" + number ;
                regexp = new RegExp(columnNEW,'g');
                let outerText = $COLUMNNEW[i].outerHTML.replace(regexp,"columnNEW"+replacedNum) ;
                $COLUMNNEW[i].outerHTML = outerText ;

            }
        }
    }else{
        if(LEFTorRIGHT == "LEFT"){
            leftOriginalDeleted++ ;
        }else if(LEFTorRIGHT == "RIGHT"){
            rightOriginalDeleted++ ;
        }
    }
    for( let i=0; i<$Row.length; i++){
        ForL(i).outerHTML = "" ;
    }
    if(LEFTorRIGHT == "LEFT"){
        leftColumnDeleted++ ;
    }else if(LEFTorRIGHT == "RIGHT"){
        rightColumnDeleted++ ;
    }
}


function adjustXY(){
    function setXY(element, x, y){
        element.setAttribute("x",x);
        element.setAttribute("y",y);
    }
    let $Row = document.getElementsByClassName("Row");
    for( let i=0; i<$Row.length; i++){
        let $column = $Row[i].children ;
        for(let j=0; j<$column.length; j++){
            let $img = $column[j].firstElementChild;
            let $button = $column[j].lastElementChild;
            setXY($column[j], j, i);
            setXY($img, j, i);
            setXY($button, j, i);
        }
    }
}

let $saveForm = document.getElementById('saveLayout');
let action = $saveForm.getAttribute('action');
$saveForm.setAttribute('action',action+"/0/0/0/0/0/0/0/0");
function seturl(){
    let topNew = topRowAdded-topRowDeleted;
    let bottomNew = bottomRowAdded-bottomRowDeleted;
    let leftNew = leftColumnAdded-leftColumnDeleted;
    let rightNew = rightColumnAdded-rightColumnDeleted;
    $saveForm.setAttribute('action',action+"/"+ topNew +"/"+ bottomNew +"/"+ leftNew +"/"+ rightNew +"/"+ topOriginalDeleted +"/"+ bottomOriginalDeleted +"/"+ leftOriginalDeleted +"/"+ rightOriginalDeleted);
}

function Top(){
    if( $btn[0].classList.contains("add") ){
        addRow("TOP");
    }else{
        deleteRow("TOP");
    }
    adjustXY();
    seturl();
    $imgParent = document.getElementsByClassName("imgParent");
    setHiddenXY();
}

function Bottom(){
    if( $btn[1].classList.contains("add") ){
        addRow("BOTTOM");
    }else{
        deleteRow("BOTTOM");
    }
    adjustXY();
    seturl();
    $imgParent = document.getElementsByClassName("imgParent");
    setHiddenXY();
}

function Left(){
    if( $btn[2].classList.contains("add") ){
        addColumn("first");
        leftColumnAdded ++;
    }else{
        deleteColumn("LEFT");
    }
    adjustXY();
    seturl();
    $imgParent = document.getElementsByClassName("imgParent");
    setHiddenXY();
}

function Right(){
    if( $btn[3].classList.contains("add") ){
        addColumn();
        rightColumnAdded ++;
    }else{
        deleteColumn("RIGHT");
    }
    adjustXY();
    seturl();
    $imgParent = document.getElementsByClassName("imgParent");
    setHiddenXY();
}

