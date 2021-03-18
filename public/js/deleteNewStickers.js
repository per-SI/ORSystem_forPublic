const $Dcontainer = document.getElementById('deleteContainer');
const $checkbox = document.getElementsByClassName('checkbox');
const $deleteBTN = document.getElementById('delete');
const $coverNewModal = document.getElementById('coverNewModal');
const $btn = document.getElementById('openCheckbox');

$btn.addEventListener('click',function(event){
    let $newImg = document.getElementsByClassName('newImg');
    if($btn.classList.contains('on')){
        cancelDeleteMode($newImg);
    }else{
        $btn.classList.add('on');
        $btn.textContent = "削除をやめる";
        $Dcontainer.classList.remove('hidden');
        $coverNewModal.classList.remove('nocover');
        $coverNewModal.classList.add('NewModalCover');
        let j = $newImg.length;
        for( let i=0; i<j; i++ ){
            $newImg[i].setAttribute('onclick','selectToD(event)');
            $newImg[i].style.opacity = "0.7" ;
            $newImg[i].draggable = false ;
        }
    }
})

function cancelDeleteMode(a){
    $btn.classList.remove('on');
        $btn.textContent = "ステッカー削除";
        $Dcontainer.classList.add('hidden');
        $coverNewModal.classList.remove('NewModalCover');
        $coverNewModal.classList.add('nocover');
        $deleteBTN.disabled = true;
        let j = a.length;
        for( let i=0; i<j; i++ ){
            a[i].setAttribute('onclick','');
            a[i].parentNode.classList.remove('selectedToD');
            a[i].style.removeProperty("opacity");
            a[i].draggable = true ;
        }
        $deleteBTN.disabled = true;
}


function selectToD(event){

    if(!event.target.parentNode.classList.contains('selectedToD')){
        event.target.parentNode.classList.add('selectedToD');
        $deleteBTN.disabled = false;
    }else{
        event.target.parentNode.classList.remove('selectedToD');
    }

    let YToDelete =[];
    let YToStay = [];
    let $newImg = document.getElementsByClassName('newImg');
    let j = $newImg.length ;
    for( let i=0; i<j; i++ ){
        if($newImg[i].parentNode.classList.contains('selectedToD')){
            YToDelete.push(i+1);
        }else{
            YToStay.push(i+1);
        }
    }

    if(!YToDelete.length){
        $deleteBTN.disabled = true;
    }

    $deleteBTN.setAttribute('arr',YToDelete);
    $deleteBTN.setAttribute('arr2',YToStay);
    $deleteBTN.setAttribute('onclick','deleteNewStickers(event)');

    console.log(YToDelete,YToStay);

}

async function deleteNewStickers(event){
    let codesD = event.target.getAttribute('arr');
    let codesS = event.target.getAttribute('arr2');
    if(!codesS){
        codesS = "0" ;
    }
    try{
        const res = await axios.get('/orderandreplace/deleteNewStickers/'+$shop+'/'+codesD+"/"+codesS);
        if(res.data == "UpdateNewStickers"){
            let $selectedToD = document.getElementsByClassName('selectedToD');
            let j = $selectedToD.length
            for( let i=0; i<j; i++ ){
                let h = j-i-1 ;
                $selectedToD[h].remove();
            }

            cancelDeleteMode(document.getElementsByClassName('newImg'));

            if($newZone.innerHTML !== ""){
                let $newList = document.getElementsByClassName('new');
                let k = $newList.length;
                for( let i=0; i<k; i++){
                    $newList[i].id = 'row'+i+'column1000' ;
                    $newList[i].setAttribute("y",i);
                }
            }
        }
    }catch(error){
        console.log(error);
    }
}
