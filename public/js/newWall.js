//shop名＆ラック名の変更

const ModeBTN = document.getElementById('SelectorNamerBTN');

const $shopSelected = document.getElementById('shopSelected');
const $shopName = document.getElementById('shopName');
const $wallName = document.getElementById('wallName');

const $QofRow = document.getElementById('QofRow');
const $QofColumn = document.getElementById('QofColumn');

const $decide = document.getElementById('decideToCreate');

const $previewShop = document.getElementById('previewShop');
const $previewWall = document.getElementById('previewWall');



function changeMode(event){
    if(event.target.classList.contains("selectMode")){

        event.target.classList.add('inputMode');
        event.target.classList.remove('selectMode');

        $shopSelected.parentNode.classList.add('hidden');
        $shopSelected.value = "notSelected" ;
        $previewShop.textContent = "";
        $decide.disabled = true ;
        $shopName.parentNode.classList.remove('hidden');

        event.target.textContent = "既存のショップ" ;

    }else{
        event.target.classList.remove('inputMode');
        event.target.classList.add('selectMode');

        $shopName.parentNode.classList.add('hidden');
        $shopName.value = "";
        $previewShop.textContent = "";
        $decide.disabled = true ;
        $shopSelected.parentNode.classList.remove('hidden');

        event.target.textContent = "新しいショップ" ;

    }
}

function previewSelect(event){
    console.log(event.target.value);
    $previewShop.textContent = event.target.value;
    changeDisabled();
}

$shopName.addEventListener('keyup',(event)=>{
    $previewShop.textContent = event.target.value;
    changeDisabled();
})

$wallName.addEventListener('keyup',(event)=>{
    $previewWall.textContent = event.target.value;
    changeDisabled();
})

function changeDisabled(){
    if( $previewShop.textContent.match(/\S/g) && $previewWall.textContent.match(/\S/g)){
        $decide.disabled = false ;
    }else{
        $decide.disabled = true ;
    }
}


//wallの行列整理

let countX = 1 ;

let $previewXY = document.getElementById('previewXY');
let $Y = document.getElementsByClassName('Y');

function previewRow(event){
    $previewXY = document.getElementById('previewXY');
    console.log(event.target.value);
    let $children =  $previewXY.children ;
    let k= $children.length ;
    console.log($children)
    for( let i=0; i<k; i++ ){
        $previewXY.removeChild($previewXY.lastElementChild);
    }
    for( let i=0; i<Number(event.target.value); i++ ){
        let $Y = document.createElement("div");
        $Y.setAttribute("class","Y");
        $previewXY.appendChild($Y);
        for( let j=0; j<countX; j++ ){
            let $X = document.createElement("div");
            $X.setAttribute("class","X");
            $Y.appendChild($X);
        }
    }
}

function previewColumn(event){
    console.log(event.target.value);
    $Y = document.getElementsByClassName('Y');
    for( let i=0; i<$Y.length; i++ ){
        let $children =  $Y[i].children ;
        let k= $children.length ;
        console.log($children)
        for( let j=0; j<k; j++ ){
            $Y[i].removeChild($Y[i].firstElementChild);
        }
    }
    for( let i=0; i<$Y.length; i++ ){
        for( let j=0; j<Number(event.target.value); j++ ){
            let $X = document.createElement("div");
            $X.setAttribute("class","X");
            $Y[i].appendChild($X);
        }
    }
    countX = Number(event.target.value) ;
}
