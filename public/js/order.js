const $modal = document.getElementById('orderModal');
const $cover = document.getElementById('coverPage');
const $orderCon = $modal.innerHTML;

function openModal(event){

    $modal.classList.add('open');
    $cover.classList.add('cover');
    let j = Number(event.target.getAttribute('same'));

    for( let i=1 ; i<=j; i++){
        let $orderContainer = document.createElement('div');
        $orderContainer.setAttribute('class','orderContainer');
        let $orderWrapper = document.createElement('div');
        $orderWrapper.setAttribute('class','orderWrapper');
        let $orderANDimg = document.createElement('div');
        $orderANDimg.setAttribute('class','orderImgP');
        let $orderImg = document.createElement('img');
        $orderImg.src = event.target.getAttribute('subsrc'+i)
        let $orderANDquantity = document.createElement('div');
        $orderANDquantity.setAttribute('class','orderQuantity');
        let $Qselecter = document.createElement('select');
        $Qselecter.setAttribute('name','quantity');
        $Qselecter.setAttribute('class','selecter');
        $Qselecter.setAttribute('code',event.target.getAttribute('code'+i));
        $modal.appendChild($orderContainer);
        $orderContainer.appendChild($orderWrapper);
        $orderWrapper.appendChild($orderANDimg);
        $orderWrapper.appendChild($orderANDquantity);
        $orderANDimg.appendChild($orderImg);
        $orderANDquantity.appendChild($Qselecter);
    }
    let $selecter = document.getElementsByClassName('selecter');
    for( let i=0; i<j; i++ ){
        let $option0 = document.createElement('option');
        $option0.setAttribute('value','-');
        $selecter[i].appendChild($option0);
        $option0.textContent = "-" ;
        for(let j=0 ; j<50; j++ ){
            let $option = document.createElement('option');
            $option.setAttribute('value',j+1);
            $selecter[i].appendChild($option);
            $option.textContent = j+1 ;
        }
        let options = $selecter[i].options ;
        if(event.target.getAttribute('quantity'+(i+1)) == '' || event.target.getAttribute('quantity'+(i+1)) == '-' ){

        }else{
            options[event.target.getAttribute('quantity'+(i+1))].selected = true;
        }
        $selecter[i].addEventListener('change',async()=>{
            try{
                let sheetNum = document.getElementById('sheetNum').textContent;
                $cover.setAttribute('onclick','');
                const res = await axios.get('/orderandreplace/order/'+sheetNum+"/"+$selecter[i].getAttribute('code')+'/'+$selecter[i].value);
                console.log(res.data)
                let setTargetStickers = document.getElementsByName(event.target.getAttribute('number'));
                let h = setTargetStickers.length;
                for( let k=0; k<h; k++ ){
                    setTargetStickers[k].setAttribute('quantity'+(i+1),$selecter[i].value);
                }
                $cover.setAttribute('onclick','closeModal(event)');

            }catch(error){
                console.log("error");
            }
        })
    }
}


