const $mainZone = document.getElementById('mainzone');
const $subZone = document.getElementById('subzone');
const $newZone = document.getElementById('newzone');
let dragTargetId ;

let newstickerCountY = $newZone.childElementCount;


//DnD関数

let BackGroundColor;

function dragStarted(event) {
    event.stopPropagation();
    $subZone.setAttribute("draggable","true");
    //event.dataTransfer.setData('text',event.target.id); //dataTransferオブジェクトにドラッグ対象のidを格納
    dragTargetId = event.target.id ;
};

function dragEnter(event) {
    event.stopPropagation()
    event.preventDefault();
    BackGroundColor = event.target.style.backgroundColor;
    event.target.style.backgroundColor = "lightblue";
};

function dragLeave(event){
    event.stopPropagation()
    event.preventDefault();
    event.target.style.backgroundColor = BackGroundColor;
};

function dragOver(event){
    event.stopPropagation()
    event.preventDefault();
};

function drop(event) {
    event.stopPropagation()
    event.target.style.backgroundColor = BackGroundColor;
    let DragTargetId = document.getElementById(dragTargetId).parentNode.id;
    let dragTargetImg = document.getElementById(DragTargetId).innerHTML;

    let DropTargetId = document.getElementById(event.target.id).parentNode.id;
    let dropTargetImg = document.getElementById(DropTargetId).innerHTML;

    if(event.target.classList.contains('newImg') && document.getElementById(DropTargetId).classList.contains('new')){
        if(!document.getElementById(DragTargetId).classList.contains('new')){
            document.getElementById(DragTargetId).innerHTML = dropTargetImg ;
            $subZone.innerHTML += '<div class="sub column imgParent" draggable="false" x="" y="1000" >'+ dragTargetImg +'</div>' ;
            document.getElementById(dragTargetId).id += ",Added" ;
        }else{
            document.getElementById(DragTargetId).innerHTML = dropTargetImg ;
            document.getElementById(DropTargetId).innerHTML = dragTargetImg ;
        }


    }else if(event.target.id !== "subzone"){
        if(document.getElementById(DragTargetId).classList.contains('new') && document.getElementById(dragTargetId).classList.contains('newImg')){
            document.getElementById(DropTargetId).innerHTML = dragTargetImg ;
            $subZone.innerHTML += '<div class="sub column imgParent" draggable="false" x="" y="1000" >'+ dropTargetImg +'</div>' ;
            document.getElementById(dragTargetId).id += ",Added" ;
        }else{
            document.getElementById(DragTargetId).innerHTML = dropTargetImg ;
            document.getElementById(DropTargetId).innerHTML = dragTargetImg ;
        }

    }else{

        document.getElementById(DragTargetId).innerHTML = '<img class="fromSub stickerImg touchable" x="" y="2000" code="-1" draggable="true" ondragstart="dragStarted(event)" ondragover="dragOver(event)" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondrop="drop(event)">' ;
        $subZone.innerHTML += '<div class="sub column imgParent" draggable="false" x="" y="1000" >'+ dragTargetImg +'</div>' ;
        let $fromSub = document.getElementsByClassName('fromSub');
        let $subList = document.getElementsByClassName('sub');

        for( let i=0; i<$subList.length; i++){
            $subList[i].id = 'row1000column'+i ;
            $subList[i].setAttribute("x",i);
        }
        for( let i=0; i<$fromSub.length; i++ ){
            $fromSub[i].id = i+',1000' ;
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

    makeXYdata();

    $subZone.setAttribute("draggable","false");

    event.preventDefault();
};


