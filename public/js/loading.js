window.onload = function(){
    const $loadingCover = document.getElementById('loadingCover');
    const $spinner = document.getElementById('spinner');
    const $loadingMessage = document.getElementById('loadingMessage');
    $spinner.classList.remove('spinner');
    $loadingCover.classList.add('loaded');
    $loadingMessage.textContent="Loaded!";
}
