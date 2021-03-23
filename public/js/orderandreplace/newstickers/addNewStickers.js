let $datalist = document.getElementById('datalist');
const $newzoneContents = document.getElementsByClassName("newContents");
const $finishBTN = document.getElementById('finishBTN');

let $newParent = document.getElementsByClassName('new');
let newParentLengthOrigin = $newParent.length;

function registerMode(){
    $newModal.classList.add('registerMode');
    $newZone.classList.add('flexMode');
    let j = $newzoneContents.length;
    for( let i=0; i<j; i++){
        $newzoneContents[i].classList.remove('hiddenContents');
    }
}

function closeRegisterModal(){
    $newModal.classList.remove('registerMode');
    $newZone.classList.remove('flexMode');
    let j = $newzoneContents.length;
    for( let i=0; i<j; i++){
        $newzoneContents[i].classList.add('hiddenContents');
    }
    $datalist.innerHTML = "";
}

document.getElementById('searchBTN').addEventListener('click',async()=>{
    $datalist.innerHTML = "";
    let $word = document.getElementById('word').value ;
    try{
        orderLoading();//from order.js
        console.log($word);
        const res = await axios.get('/orderandreplace/search/'+$word);
        let code = [];
        let name = [];
        let number = [];
        let gazou = [];
        for( let i=0; i<res.data.length; i++ ){
            code.push(res.data[i].code);
            name.push(res.data[i].name);
            number.push(res.data[i].number);
            gazou.push(res.data[i].gazou);
        }
        console.log(code,name,number,gazou,$dir);

        for( let i=0; i<res.data.length; i++ ){
            let $dataInfo = document.createElement('div');
            $dataInfo.setAttribute('class','dataInfo');
            $dataInfo.setAttribute('code',code[i]);

            let  $Name = document.createElement('div');
            $Name.setAttribute('class','name');
            $Name.textContent = name[i] ;

            let  $Number = document.createElement('div');
            $Number.setAttribute('class','number');
            $Number.textContent = number[i] ;

            let  $Gazou = document.createElement('div');
            $Gazou.setAttribute('class','gazou');

            let $stickerImg = document.createElement('img');
            $stickerImg.setAttribute('class','serchlist');
            $stickerImg.setAttribute('src',$dir+'/'+gazou[i]);

            $datalist.appendChild($dataInfo);
            $dataInfo.appendChild($Number);
            $dataInfo.appendChild($Name);
            $dataInfo.appendChild($Gazou);
            $Gazou.appendChild($stickerImg);

            $Gazou.setAttribute('onclick','select(event)');
        }

        if( res.data.length>0 ){
            let $addBTN = document.createElement('button');
            $addBTN.setAttribute('id','addBTN')
            $addBTN.textContent="追加";
            $addBTN.disabled = true ;

            $datalist.appendChild($addBTN);

        }

        orderLoaded();//from order.js

    }catch(error){
        console.log(error);
    }
})


function select(event){

    let $dataInfo = document.getElementsByClassName('dataInfo');
    let $addBTN = document.getElementById('addBTN');

    if(!event.target.parentNode.classList.contains('selected')){
        event.target.parentNode.classList.add('selected');
        $addBTN.disabled = false;
    }else{
        event.target.parentNode.classList.remove('selected');
    }

    let selectedCode =[];

    for( let i=0; i<$dataInfo.length; i++ ){
        if($dataInfo[i].classList.contains('selected')){
            selectedCode.push($dataInfo[i].getAttribute('code'));
        }
        }

    if(!selectedCode.length){
        $addBTN.disabled = true;
    }

    $addBTN.setAttribute('arr',selectedCode);
    $addBTN.setAttribute('onclick','addNewStickers(event)');


    console.log(selectedCode);

}

async function addNewStickers(event){
    let codes = event.target.getAttribute('arr');
    let $selected = document.getElementsByClassName('selected');
    let j = $selected.length ;
    let selectedNumbers = [];
    for(let i=0; i<j; i++){
        selectedNumbers.push("'"+$selected[i].children[0].textContent+"'");
    }
    try{
        orderLoading();//from order.js
        const res = await axios.get('/orderandreplace/addNewStickers/'+$shop+'/'+codes+'/'+selectedNumbers);

        $newParent = document.getElementsByClassName('new');
        let h = $newParent.length ;
        for( let i=0; i<j; i++){
            let k = i+h ;
            let newP = document.createElement("div");
            newP.setAttribute("class","new");
            newP.classList.add("column");
            newP.classList.add("imgParent");
            newP.setAttribute("x","1000");
            newP.setAttribute("y",k);
            newP.setAttribute("id","row"+k+"column1000");
            newP.setAttribute("draggable","false");

            newParentLengthOrigin += i ;
            let newS = document.createElement("img");
            newS.setAttribute("class","stickerImg");
            newS.classList.add("touchable");
            newS.classList.add("newImg");
            newS.setAttribute("x","1000");
            newS.setAttribute("y",newParentLengthOrigin);
            newS.setAttribute("id","1000,"+newParentLengthOrigin);
            newS.setAttribute("draggable","true");
            newS.setAttribute("src",$selected[i].children[2].firstElementChild.src);
            newS.setAttribute("code",$selected[i].getAttribute("code"));
            newS.setAttribute("number",$selected[i].children[0].textContent);
            newS.setAttribute("name",$selected[i].children[0].textContent);
            newS.setAttribute("ondragstart","dragStarted(event)");
            newS.setAttribute("ondragover","dragOver(event)");
            newS.setAttribute("ondragenter","dragEnter(event)");
            newS.setAttribute("ondragleave","dragLeave(event)");
            newS.setAttribute("ondrop","drop(event)");

            $newZone.appendChild(newP);
            newP.appendChild(newS);

        }
        newParentLengthOrigin++;

        setStickerData(res.data);
        document.getElementById('addBTN').disabled = true;
        for(let i=0; i<j; j-- ){
            $selected[i].classList.remove("selected");
        }

        orderLoaded();//from order.js

    }catch(error){
        console.log(error);
    }
}

