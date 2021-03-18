const $cover2 = document.getElementById('cover2');
const $modal = document.getElementById('alertModal');

function changeDisabled(event){
    if(event.target.checked){
        document.getElementById('deleteModalBTN').disabled = false ;
    }else{
        document.getElementById('deleteModalBTN').disabled = true ;
    }
}

function openModal(){
    $cover2.classList.add('covering');
    $modal.classList.add('show');
    document.getElementById('deleteWallForm').style.opacity = "1";
}

function closeModal(){
    $cover2.classList.remove('covering');
    $modal.classList.remove('show');
    document.getElementById('deleteModalBTN').disabled = true ;
    document.getElementById('deleteAgreement').checked = false ;
    document.getElementById('deleteWallForm').style.removeProperty('opacity');
}
