async function replace(){
    try{
        if(codes.length){
            const res = await axios.get("/replace/"+$shop+"/"+$wall+"/"+X+"/"+Y+"/"+codes+"/"+ncodes);
            setImgAttributes("main");
            setImgAttributes("new");
            $subZone.innerHTML = "" ;
            console.log(res.data);
        }
    }catch(error){
        console.log(error);
    }
}

function setImgAttributes(target){
    let $targetP = document.getElementsByClassName(target);
    let j = $targetP.length ;
    for( let i=0; i<j; i++ ){
        let $targetImg = $targetP[i].firstElementChild ;
        let $targetX = $targetP[i].getAttribute('x');
        let $targetY = $targetP[i].getAttribute('y');
        $targetImg.setAttribute('x',$targetX);
        $targetImg.setAttribute('y',$targetY);
        $targetImg.id = $targetX+","+$targetY;
        $targetImg.classList.remove('newImg');
        $targetImg.classList.remove('fromsub');
        if(target==="new"){
            $targetImg.classList.add('newImg');
        }
    }
}

async function saveTemporary(){
    try{
        const res = await axios.get("/saveTemporary/"+$shop+"/"+$wall+"/"+X+"/"+Y+"/"+codes+"/"+ncodes+"/"+scodes);
        console.log(res.data);
    }catch(error){
        console.log(error);
    }
}

async function readTemporary(){
    try{
        const res = await axios.get("/readTemporary/"+$shop+"/"+$wall);
        console.log(res.data);
        $mainZone.textContent = "" ;
        $subZone.textContent = "" ;

        new mainRowColumn(res.data[2].rowLength, res.data[3].columnLength).createWall();
        new otherRowColumn(res.data[1].length,"sub").createWall();

        let j = res.data[0].length;
        for(let i=0; i<j; i++){
            let stickerInfo = res.data[0][i];
            new sticker(stickerInfo.code, stickerInfo.number, stickerInfo.y, stickerInfo.x, stickerInfo.gazou).setSticker();
        }

        j = res.data[1].length;
        for(let i=0; i<j; i++){
            let stickerInfo = res.data[1][i];
            new sticker(stickerInfo.code, stickerInfo.number, stickerInfo.y, stickerInfo.x, stickerInfo.gazou).setSticker();
        }

        await getStickerData();
        if(orderItemsList.length){
            j = orderItemsList.length ;
            for( let i=0; i<j; i++){
                orderItemsList[i].setQuantity(); //orderItemsListはordersheet.jsを参照
            }
        }

        makeXYdata();

    }catch(error){
        console.log(error);
    }
}
