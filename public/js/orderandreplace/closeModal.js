function closeModal(event){

    $modal.classList.remove('open');
    $cover.classList.remove('cover');
    $rankModal.classList.remove("openRankModal");
    $modal.innerHTML = $orderCon;

    $sheetModal.classList.remove('open2');
    $newSheetContainer.classList.remove('open4');
    $selectSheetContainer.classList.remove('open3');
    let j = $selectSheetContainer.childElementCount-1 ;
    for( let i=0; i<j ; i++ ){
        $selectSheetContainer.removeChild($selectSheetContainer.lastElementChild);
    }
    closeCalendar(event);
    document.getElementById('deliveryDate').textContent = "カレンダーから選択";

}
