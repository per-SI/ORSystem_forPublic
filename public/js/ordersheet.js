const $sheetModal = document.getElementById('sheetModal');
const $newSheetContainer = document.getElementById('newSheetContainer');
const $selectSheetContainer = document.getElementById('selectSheetContainer');

function openModal2(event){
    $sheetModal.classList.add('open2');
    $cover.classList.add('cover');

    if(event.target.id==="newSheetOpenBTN"){
        $newSheetContainer.classList.add('open4');
    }else{
        $selectSheetContainer.classList.add('open3');
        async function getSheetList(){
            try{

                const res = await axios.get('/orderandreplace/showSheetList/'+$shop);
                console.log(res.data,new Date(res.data[0].date).getFullYear());

                let j= res.data.length;
                for( let i=0; i<j; i++ ){

                    let $SheetInfo = document.createElement('div');
                    $SheetInfo.setAttribute("class","SheetInfo") ;
                    $SheetInfo.setAttribute("onclick","showSheet(event)") ;
                    $selectSheetContainer.appendChild($SheetInfo);

                    for( let k=0; k<4; k++ ){
                        let sheetinfo = document.createElement('div');
                        sheetinfo.setAttribute('class','sheetinfo SI sheet'+i);
                        $SheetInfo.appendChild(sheetinfo);
                    }
                    let sheetinfo = document.getElementsByClassName('sheet'+i);
                    sheetinfo[0].textContent = res.data[i].code;
                    sheetinfo[1].textContent = res.data[i].date;

                    for( let h=0; h<2; h++ ){
                        let firstC = document.createElement('div');
                        let secondC = document.createElement('div');

                        sheetinfo[h+2].appendChild(firstC);

                        if(h===0){
                            firstC.textContent = res.data[i].order_shop;
                            firstC.appendChild(document.createElement('br'));
                            firstC.appendChild(secondC);
                            secondC.setAttribute('class','comment');
                            secondC.textContent = res.data[i].note;
                        }else{
                            firstC.textContent = res.data[i].delivery_date;
                            firstC.appendChild(document.createElement('br'));
                            firstC.appendChild(secondC);
                            secondC.textContent = res.data[i].delivery_method;
                        }
                    }

                    let selectSheetBTN = document.createElement('button');
                    $SheetInfo.appendChild(selectSheetBTN);
                    selectSheetBTN.setAttribute('class','selectSheet');
                    selectSheetBTN.setAttribute('onclick','selectSheet(event)');
                    selectSheetBTN.textContent = '選択';
                }

            }catch(error){
                console.log(error);
            }
        }
        getSheetList();
    }

}

async function createSheet(){
    try{
        let Ddate = document.getElementById('deliveryDate').textContent;
        let Dmethod = document.getElementById('deliveryMethod').value;
        let Dsource = document.getElementById('shipmentSource').value;
        let Dcomment = document.getElementById('sheetComment').value;
        if(Dcomment == ""){
            Dcomment = "nocomment"
        }
        const res = await axios.post("/orderandreplace/createSheet",{
            shop: $shop,
            date: Ddate,
            method: Dmethod,
            source: Dsource,
            comment: Dcomment,
        });
        document.getElementById('deliveryDate').textContent = "カレンダーから選択" ;
        document.getElementById('deliveryMethod').value = "配送";
        document.getElementById('sheetComment').value = "";
        let sheetCode = res.data[0].code ;
        document.getElementById('sheetNum').textContent = sheetCode ;

        closeModal();
    }catch(error){
        console.log(error);
    }
}

class orderItems{

    constructor(name,code,quantity,number,sort){
        this.name = name ;
        this.code = code ;
        this.quantity = quantity ;
        this.number = number ;
        this.sort = sort ;
    }

    setQuantity(){
        let targetSticker = document.getElementsByName(this.number);
        let k = targetSticker.length;
        for( let l=0; l<k; l++ ){
            targetSticker[l].setAttribute('quantity'+this.sort,this.quantity);
        }
    }

    showItemQuantity(){
        let contentP = document.createElement("div");
        contentP.setAttribute("class","SheetContents");
        document.getElementById("orderSheetInfoModal").appendChild(contentP);

        for(let i=0; i<3; i++){
            let content = document.createElement("div");
            content.setAttribute("class","sheetcontent");
            contentP.appendChild(content);
        }


        contentP.children[0].textContent = this.number ;
        contentP.children[1].textContent = this.name ;
        contentP.children[2].textContent = this.quantity ;
    }

}

async function selectSheet(event){
    event.stopPropagation();
    try{
        let sheetCode = event.target.parentNode.firstElementChild.textContent;
        const res = await axios.get('/orderandreplace/selectSheet/'+sheetCode);

        console.log(res.data);
        document.getElementById('sheetNum').textContent = sheetCode ;
        let b = img.length ;
        for( let a=0; a<b; a++ ){
            let d =  Number(img[a].getAttribute('same'));
            for( let c=0; c<d; c++ ){
                img[a].setAttribute("quantity"+(c+1),"");
            }
        }
        orderItemsList = [];
        let j = res.data.length;
        for(let i=0; i<j; i++){
            orderItemsList.push(new orderItems(res.data[i].name, res.data[i].code_product, res.data[i].quantity, res.data[i].number, res.data[i].sort));
            orderItemsList[i].setQuantity();
        }
        closeModal();

    }catch(error){
        console.log(error);
    }
}

async function showSheet(event){
    try{
        let sheetCode = event.currentTarget.firstElementChild.textContent;
        const res = await axios.get('/orderandreplace/selectSheet/'+sheetCode);
        console.log(res.data);

        document.getElementById("orderSheetInfoModal").classList.add("orderSheetInfoModalOpen");
        document.getElementById("coverPage2").classList.add("cover2");

        document.getElementById("sheetInfomation").textContent = "発注書No." + sheetCode + "  /  " + "SHOP:" + $shop ;

        orderItemsList = [];
        let j = res.data.length;
        for(let i=0; i<j; i++){
            orderItemsList.push(new orderItems(res.data[i].name, res.data[i].code_product, res.data[i].quantity, res.data[i].number, res.data[i].sort));
            orderItemsList[i].showItemQuantity();
        }

    }catch(error){
        console.log(error);
    }
}

function closeSheet(){
    let $SheetContents = document.getElementsByClassName("SheetContents");
    for(let i=0; i<$SheetContents.length; i){
        $SheetContents[i].remove();
    }
    document.getElementById("orderSheetInfoModal").classList.remove("orderSheetInfoModalOpen");
    document.getElementById("coverPage2").classList.remove("cover2");
}
