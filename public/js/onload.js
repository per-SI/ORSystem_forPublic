const $dir = document.getElementsByTagName('header')[0].getAttribute('name');
const $shop = document.getElementsByTagName('header')[0].id;
let $wall ;
let item = document.getElementsByClassName('imgParent');
let img = document.getElementsByClassName('stickerImg');

let orderItemsList = [] ;
let rankInfo = [] ;

class sticker{
    constructor(code,number,y,x,gazou){
        this.code = code ;
        this.number = number ;
        this.y = y-1 ;
        this.x = x-1 ;
        this.gazou = gazou ;
    }

    //columnセルにステッカーを並べる
    setSticker(){
        let target = document.getElementById("row"+this.y+"column"+this.x);
        target.children[1].setAttribute('code',this.code);
        target.children[1].setAttribute('id',this.x+","+this.y);
        target.children[1].setAttribute('number',this.number);
        target.children[1].setAttribute('name',this.number);
        target.children[1].setAttribute('x',this.x);
        target.children[1].setAttribute('y',this.y);
        if(this.gazou){
            target.children[1].setAttribute('src',$dir+"/"+this.gazou);
            target.children[1].addEventListener('load',function(event){
                let removeTarget = event.target.parentNode.firstElementChild;
                removeTarget.remove();
            })
        }else if(this.code == "-2"){
            target.classList.add('hidden');
            target.children[1].setAttribute('class','stickerImg');
            target.children[0].remove();
        }else{
            target.children[0].remove();
        }
    }

}

class mainRowColumn{
    constructor(rowLen,columnLen){
        this.rowLen = rowLen ;
        this.columnLen = columnLen ;
    }

    createWall(){
        let mainzone = document.getElementById('mainzone');
        mainzone.textContent = "";
        for(let k=0; k<this.rowLen; k++){
            let ROW = document.createElement('div');
            ROW.setAttribute('class','Row Row'+k);
            for(let h=0; h<this.columnLen; h++){
                let COLUMN = document.createElement('div');
                COLUMN.id = "row"+k+"column"+h ;
                COLUMN.setAttribute('class','main column row'+k+' column'+h+' imgParent');
                COLUMN.setAttribute("x",h);
                COLUMN.setAttribute("y",k);
                COLUMN.draggable = false ;

                let imgLoading = document.createElement('div');
                imgLoading.setAttribute('class','loader');
                COLUMN.appendChild(imgLoading);

                let IMG = document.createElement('img');
                IMG.draggable = true ;
                IMG.setAttribute('onclick','openModal(event)');
                IMG.setAttribute('ondragstart','dragStarted(event)');
                IMG.setAttribute('ondragover','dragOver(event)');
                IMG.setAttribute('ondragenter','dragEnter(event)');
                IMG.setAttribute('ondragleave','dragLeave(event)');
                IMG.setAttribute('ondrop','drop(event)');
                IMG.setAttribute('class','stickerImg touchable');

                ROW.appendChild(COLUMN);
                COLUMN.appendChild(IMG);
            }
            mainzone.appendChild(ROW);
        }
    }

}

class otherRowColumn{
    constructor(length,zone){
        this.length = length ;
        this.zone = zone ;
    }

    createWall(){
        let zone = document.getElementById(this.zone+'zone');
        zone.textContent = "";
        for(let h=0; h<this.length; h++){
            let COLUMN = document.createElement('div');
            let IMG = document.createElement('img');

            COLUMN.setAttribute('class',this.zone+' column imgParent');
            IMG.setAttribute('class','stickerImg touchable');

            if(this.zone==="new"){
                COLUMN.id = "row"+h+"column1000" ;
                COLUMN.setAttribute("x","1000");
                COLUMN.setAttribute("y",h);
                IMG.classList.add('newImg');
            }else{
                COLUMN.id = "row1000"+"column"+h ;
                COLUMN.setAttribute("x",h);
                COLUMN.setAttribute("y","1000");
            }

            COLUMN.draggable = false ;

            IMG.draggable = true ;
            IMG.setAttribute('onclick','openModal(event)');
            IMG.setAttribute('ondragstart','dragStarted(event)');
            IMG.setAttribute('ondragover','dragOver(event)');
            IMG.setAttribute('ondragenter','dragEnter(event)');
            IMG.setAttribute('ondragleave','dragLeave(event)');
            IMG.setAttribute('ondrop','drop(event)');

            COLUMN.appendChild(IMG);
            zone.appendChild(COLUMN);
        }
    }
}

async function setWall(event){
    try{
        let targetWall = document.getElementById('wall').value;
        const res = await axios.get('/orderandreplace/moveWall/'+$shop+'/'+targetWall);
        let rowLen = res.data[1].rowLength ;
        let columnLen = res.data[2].columnLength ;

        new mainRowColumn(rowLen,columnLen).createWall();

        let j = res.data[0].length;
        for(let i=0; i<j; i++){
            let stickerInfo = res.data[0][i];
            new sticker(stickerInfo.code, stickerInfo.number, stickerInfo.y, stickerInfo.x, stickerInfo.gazou).setSticker();
        }

        $wall = targetWall;
        document.getElementById("goToChangeLayout").setAttribute("href","/orderandreplace/Layout/"+$shop+"/"+$wall);

    }catch(error){
        console.log(error);
    }
}

function setStickerData(res){
    let j = res.length;
    for( let i=0; i<j; i++ ){
        let targetSticker = document.getElementsByName(res[i].number);
        let k = targetSticker.length;
        for( let l=0; l<k; l++ ){
            targetSticker[l].setAttribute('code'+res[i].sort, res[i].code);
            targetSticker[l].setAttribute('subsrc'+res[i].sort, $dir+'/'+res[i].gazou);
            if(targetSticker[l].getAttribute("same") < res[i].sort){
                targetSticker[l].setAttribute('same',res[i].sort);
            }
            targetSticker[l].setAttribute('quantity'+res[i].sort,'');
        }
    }
}

async function getStickerData(){
    j = img.length;
    numbers = "";
    for( let i=0; i<j; i++ ){
        numbers += "'"+img[i].getAttribute('number')+"',";
    }
    numbers = numbers.slice(0,-1);
    try{
        const res = await axios.get('/orderandreplace/readData/'+numbers);
        console.log(res.data);
        setStickerData(res.data);
    }catch(error){
        console.log(error);
    }
}

async function moveWall(){
    await setWall();
    await getStickerData();
    if(orderItemsList.length && document.getElementById('sheetNum').textContent !== "------" ){
        let j = orderItemsList.length ;
        for( let i=0; i<j; i++){
            orderItemsList[i].setQuantity(); //orderItemsListはordersheet.jsを参照
        }
    }
    makeXYdata();
    console.log($wall);
    let k = rankInfo.length ;
    for(let l=0; l<k; l++){
        rankInfo[l].setRank();
    }
}

//document.addEventListener('DOMContentLoaded',moveWall())

