const $Dcontainer = document.getElementById('deleteContainer');
const $deleteID = document.getElementsByClassName('deleteID');
const $deleteBTN = document.getElementById('delete');
const $datalist = document.getElementById('datalist');
const $coverPage = document.getElementById('coverPage');
const $btn = document.getElementById('openCheckbox');

$btn.addEventListener('click',function(event){
    let $newImg = document.getElementsByClassName('dataInfo');
    if($btn.classList.contains('on')){
        cancelDeleteMode($newImg);
    }else{
        $btn.classList.add('on');
        $btn.textContent = "削除をやめる";
        $Dcontainer.classList.remove('hidden');
        $coverPage.classList.remove('nocover');
        $coverPage.classList.add('NewModalCover');
        $datalist.style.zIndex = 2 ;
        let j = $newImg.length;
        for( let i=0; i<j; i++ ){
            $newImg[i].style.zIndex = 3 ;
            $newImg[i].setAttribute('onclick','selectToD(event)');
            $newImg[i].style.opacity = "0.9" ;
            $newImg[i].draggable = false ;
        }
    }
})

function cancelDeleteMode(a){
    $btn.classList.remove('on');
        $btn.textContent = "ステッカー削除";
        $Dcontainer.classList.add('hidden');
        $coverPage.classList.remove('NewModalCover');
        $coverPage.classList.add('nocover');
        $datalist.style.removeProperty('zIndex');
        $deleteBTN.disabled = true;
        let j = a.length;
        for( let i=0; i<j; i++ ){
            a[i].style.removeProperty('zIndex');
            a[i].setAttribute('onclick','');
            a[i].parentNode.classList.remove('selectedToD');
            a[i].style.removeProperty("opacity");
            a[i].draggable = true ;
        }
        $deleteBTN.disabled = true;
}


function selectToD(event){

    if(!event.target.classList.contains('selectedToD')){
        event.target.classList.add('selectedToD');
    }else{
        event.target.classList.remove('selectedToD');
    }

    let $newImg = document.getElementsByClassName('dataInfo');
    let j = $newImg.length ;
    for( let i=0; i<j; i++ ){
        if($newImg[i].lastElementChild.classList.contains('selectedToD')){
            $deleteID[i].value = $newImg[i].firstElementChild.textContent ;
        }
    }

    if(document.getElementsByClassName('selectedToD').length){
        $deleteBTN.disabled = false;
    }else{
        $deleteBTN.disabled = true;
    }

}
