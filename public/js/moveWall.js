class sticker{
    constructor(code,number,y,x,gazou){
        this.code = code ;
        this.number = number ;
        this.y = y-1 ;
        this.x = x-1 ;
        this.gazou = gazou ;
    }

    setSticker(){
        let target = document.getElementById("row"+this.y+"column"+this.x);
        target.firstElementChild.setAttribute('class','stickerImg touchable');
        target.firstElementChild.setAttribute('code',this.code);
        target.firstElementChild.setAttribute('id',this.x+","+this.y);
        target.firstElementChild.setAttribute('number',this.number);
        target.firstElementChild.setAttribute('name',this.number);
        target.firstElementChild.setAttribute('x',this.x);
        target.firstElementChild.setAttribute('y',this.y);
        if(this.gazou){
            target.firstElementChild.setAttribute('src',$dir+"/"+this.gazou);
        }else if(this.code == "-2"){
            target.classList.add('hidden');
            target.firstElementChild.setAttribute('class','stickerImg');
        }
    }

}

class mainRowLength{
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
                COLUMN.setAttribute('class','main column row'+this.y+' column'+this.x+' imgParent');
                COLUMN.setAttribute("x",h);
                COLUMN.setAttribute("y",k);
                COLUMN.draggable = false ;

                let IMG = document.createElement('img');
                IMG.draggable = false ;
                IMG.setAttribute('onclick','openModal(event)');
                IMG.setAttribute('ondragstart','dragStarted(event)');
                IMG.setAttribute('ondragover','dragOver(event)');
                IMG.setAttribute('ondragenter','dragEnter(event)');
                IMG.setAttribute('ondragleave','dragLeave(event)');
                IMG.setAttribute('ondrop','drop(event)');

                ROW.appendChild(COLUMN);
                COLUMN.appendChild(IMG);
            }
            mainzone.appendChild(ROW);
        }
    }

}

async function moveWall(event){
    try{
        let targetWall = document.getElementById('wall').value;
        const res = await axios.get('/moveWall/'+$shop+'/'+targetWall);
        let rowLen = res.data[1].rowLength ;
        let columnLen = res.data[2].columnLength ;

        new mainRowLength(rowLen,columnLen).createWall();

        let j = res.data[0].length;
        for(let i=0; i<j; i++){
            let stickerInfo = res.data[0][i];
            new sticker(stickerInfo.code, stickerInfo.number, stickerInfo.y, stickerInfo.x, stickerInfo.gazou).setSticker();
        }

    }catch(error){
        console.log(error);
    }
}
