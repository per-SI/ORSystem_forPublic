let draggingImg;            //ドラッグさせるイメージを格納
let dragOverItem = [] ;     //入替先の要素を格納
let dIstyle ;               //draggingImg.styleを短文化
let OX = [];                //タッチ時の画面スクロール用変数
let OY = [];                //タッチ時の画面スクロール用変数
let elementTarget ;



//現在指がある座標で、最上スタックレベルのエレメントをTouchedItemに格納　
const getElementFromNowPoint = (event) => {
    touchPoint = event.touches[0];
    x = touchPoint.clientX;
    y = touchPoint.clientY;
    TouchedItem = document.elementFromPoint(x,y)
    if(!TouchedItem || !TouchedItem.classList.contains("touchable") || TouchedItem === draggingImg){
        TouchedItem = event.target;
    }
}

const moveTarget = (target)=>{
    dIstyle.top = (touchPoint.pageY - window.pageYOffset - target.offsetHeight / 2) + "px";
    dIstyle.left = (touchPoint.pageX - window.pageXOffset - target.offsetWidth / 2) + "px";
}

function touchStart(event){
    console.log(event.touches,event.changedTouches);
    //resetMeta();
    if(event.touches.length == 1 && event.target.getAttribute('draggable') === "true"){

        event.preventDefault();
        dragStarted(event);
        touchPoint = event.touches[0];

        draggingImg = event.target.cloneNode(true);
        document.body.appendChild(draggingImg);
        draggingImg.id = "dragging";
        dIstyle = draggingImg.style ;
        dIstyle.position = "fixed";
        dIstyle.zIndex = "3";
        dIstyle.opacity = "0.7";

        moveTarget(draggingImg);
        dragOverItem[0] = event.target;
        event.target.style.visibility = "hidden";

        for(let i=0; i<img.length; i++){

            if(img[i] === event.target ){
            }else{
                img[i].removeEventListener('touchstart',touchStart,false)
                img[i].removeEventListener('touchmove',touchMove,false)
                img[i].removeEventListener('touchend',touchEnd,false)
            }

        }

        elementTarget = event.target ;

    }

}


function touchMove(event){
    if(event.touches[2]){

        dragOverItem[0].style.backgroundColor = "";
        event.target.style.visibility = "";
        dragOverItem[0] = event.touches[0].target;
        if( document.getElementById("dragging") ){
            draggingImg.outerHTML = "";
        }

    }else if(event.touches[0].target == elementTarget && event.touches.length == 1){

        //console.log(event.touches,event.changedTouches);
        event.preventDefault();
        event.stopPropagation();

        //ToucedItemにdraggingImgではない(x,y)における要素を格納するためスタックレベルを下げる。
        dIstyle.zIndex = "-1" ;

        //TouchedItemに要素を格納する関数
        getElementFromNowPoint(event);
        console.log(TouchedItem);

        //getElemenrFromNowPointで拾った要素が、各モーダル内の要素ならそのモーダルを開く
        if(( !TouchedItem.classList.contains('Row') || !TouchedItem.classList.contains('main') ) && (TouchedItem.id == "newStickers" || TouchedItem.id == "newzone" || TouchedItem.parentNode.classList.contains('new')) ){
            setTimeout(()=>{
                $newModal.style.zIndex = "2" ;
                $newModal.style.width = "50%";
                $forReplaceModal.style.removeProperty("z-index");
            },100);
        }else if(( !TouchedItem.classList.contains('Row') || !TouchedItem.classList.contains('main') ) && (TouchedItem.id == "forReplace" || TouchedItem.id == "subzone" || TouchedItem.parentNode.classList.contains('sub')) ){
            setTimeout(()=>{
                $forReplaceModal.style.zIndex = "2" ;
                $forReplaceModal.style.height = "30%";
                $newModal.style.removeProperty("z-index");
            },100);
        }else if( TouchedItem.id !== elementTarget.id){
            $newModal.style.removeProperty("z-index");
            $newModal.style.removeProperty("width");
            $forReplaceModal.style.removeProperty("z-index");
            $forReplaceModal.style.removeProperty("height");
        }

        //draggingImgをタッチドラッグさせるためにスタックレベルをもとに戻す
        dIstyle.zIndex = "3";

        //入替先の背景色を変更
        if(dragOverItem[0] !== TouchedItem ){
            dragOverItem[0].style.backgroundColor = "";
            dragOverItem[0] = TouchedItem ;
            if(dragOverItem[0] !== event.target )
            dragOverItem[0].style.backgroundColor = "lightblue";
        }


        //draggingImgを指に沿って移動
        moveTarget(draggingImg);

        OX = []; OY = [];

    }
    if(event.touches[1]){

        event.preventDefault();
        const touch1 = event.touches[1];

        if(!OX[0]){
            OX[0] = touch1.clientX;
            OY[0] = touch1.clientY;
        }else{
            OX[1] = touch1.clientX;
            OY[1] = touch1.clientY;
            let Y = (OY[1]-OY[0])*0.3 ;
            let X = (OX[1]-OX[0])*0.3 ;
            window.scrollBy(-X,-Y);
        }
    }

}


function touchEnd(event){
    if(event.changedTouches.length == 1 && event.changedTouches[0].target == elementTarget){
        console.log(event.touches,event.changedTouches);
        if( document.getElementById("dragging") ){
            draggingImg.outerHTML = "";
        }


        event.preventDefault();
        event.stopPropagation();


        event.target.style.visibility = "";
        dragOverItem[0].style.backgroundColor = "";


        let DragTargetId = document.getElementById(dragTargetId).parentNode.id;
        let dragTargetImg = document.getElementById(DragTargetId).innerHTML;

        let DropTargetId = document.getElementById(dragOverItem[0].id).parentNode.id;
        let dropTargetImg = document.getElementById(DropTargetId).innerHTML;

        if(dragOverItem[0].classList.contains('newImg') && document.getElementById(DropTargetId).classList.contains('new')){
            if(!document.getElementById(DragTargetId).classList.contains('new')){
                document.getElementById(DragTargetId).innerHTML = dropTargetImg ;
                $subZone.innerHTML += '<div class="sub column imgParent" draggable="false" x="" y="1000" >'+ dragTargetImg +'</div>' ;
                document.getElementById(dragTargetId).id += ",Added" ;
            }else{
                document.getElementById(DragTargetId).innerHTML = dropTargetImg ;
                document.getElementById(DropTargetId).innerHTML = dragTargetImg ;
            }


        }else if(dragOverItem[0].id !== "subzone"){
            if(document.getElementById(DragTargetId).classList.contains('new') && document.getElementById(dragTargetId).classList.contains('newImg')){
                document.getElementById(DropTargetId).innerHTML = dragTargetImg ;
                $subZone.innerHTML += '<div class="sub column imgParent" draggable="false" x="" y="1000" >'+ dropTargetImg +'</div>' ;
                document.getElementById(dragTargetId).id += ",Added" ;
            }else{
                document.getElementById(DragTargetId).innerHTML = dropTargetImg ;
                document.getElementById(DropTargetId).innerHTML = dragTargetImg ;
            }

        }else{

            document.getElementById(DragTargetId).innerHTML = '<img class="fromSub stickerImg touchable" x="" y="2000" draggable="true" ondragstart="dragStarted(event)" ondragover="dragOver(event)" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondrop="drop(event)">' ;
            $subZone.innerHTML += '<div class="sub column imgParent" draggable="false" x="" y="1000" >'+ dragTargetImg +'</div>' ;
            let $fromSub = document.getElementsByClassName('fromSub');
            let $subList = document.getElementsByClassName('sub');

            for( let i=0; i<$subList.length; i++){
                $subList[i].id = 'row1000column'+i ;
                $subList[i].setAttribute("x",i);
            }
            for( let i=0; i<$fromSub.length; i++ ){
                $fromSub[i].id = i+',2000' ;
                $fromSub[i].setAttribute("x",i);
            }
        }

        if($subZone.innerHTML !== ""){
            let $subList = document.getElementsByClassName('sub');
            for( let i=0; i<$subList.length; i++){
                if( $subList[i].firstElementChild.src === ""){
                    $subList[i].outerHTML = '';
                }
                if($subZone.innerHTML !== ""){
                    for( let i=0; i<$subList.length; i++){
                        $subList[i].id = 'row1000column'+i ;
                        $subList[i].setAttribute("x",i);
                    }
                }
            }
        }

        if($newZone.innerHTML !== ""){
            let $newList = document.getElementsByClassName('new');
            for( let i=0; i<$newList.length; i++){
                if( $newList[i].firstElementChild.src === ""){
                    $newList[i].outerHTML = '';
                }
                if($newZone.innerHTML !== ""){
                    for( let i=0; i<$newList.length; i++){
                        $newList[i].id = 'row'+i+'column1000' ;
                        $newList[i].setAttribute("y",i);
                    }
                }
            }
        }

        $subZone.setAttribute("draggable","false");

        document.getElementById("newStickers").style.removeProperty('z-index');
        document.getElementById("forReplace").style.removeProperty('z-index');

        for(let i=0; i<img.length; i++){
            img[i].addEventListener('touchstart',touchStart,false)
            img[i].addEventListener('touchmove',touchMove,false)
            img[i].addEventListener('touchend',touchEnd,false)
        }



    }else if( event.changedTouches.length ==1 ){

        OX.length = 0;
        OY.length = 0;

    }else{

        draggingImg.outerHTML = "";

        event.preventDefault();
        event.stopPropagation();


        event.target.style.visibility = "";
        dragOverItem[0].style.backgroundColor = "";

        for(let i=0; i<img.length; i++){
            img[i].addEventListener('touchstart',touchStart,false)
            img[i].addEventListener('touchmove',touchMove,false)
            img[i].addEventListener('touchend',touchEnd,false)
        }

    }

    OX.length = 0;
    OY.length = 0;


    makeXYdata();


    $newModal.style.removeProperty("width");
    $forReplaceModal.style.removeProperty('height');
    $newModal.style.removeProperty("z-index");
    $forReplaceModal.style.removeProperty("z-index");
    console.log(2222222222222222222222);
}


function resetMeta(){
    let meta = document.getElementsByTagName('meta')[1];
    meta.setAttribute("content","width=device-width, initial-scale=-1");
    meta.setAttribute("content","width=device-width, initial-scale=1");
    console.log(meta);
}
