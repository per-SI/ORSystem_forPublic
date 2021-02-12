const $tab = document.getElementsByClassName('tab');
const $display = document.getElementById("display");
const $RFC = document.getElementById('replaceFormContainer');
const $OSC = document.getElementById('orderSheetContainer');
const $forReplaceModal = document.getElementById("forReplace");
const $newModal = document.getElementById("newStickers");
const $span1 = document.getElementById('span1');
const $span3 = document.getElementById('span3');
const $addnewBTN = document.getElementById('addnewBTN');

for(let i=0;i<$tab.length;i++){
    $tab[i].addEventListener("click" ,function (event) {
        $tab[1-i].classList.remove("active");
        event.target.classList.add("active");

        if(document.getElementById('changeDisplay').classList.contains('active') === false){
            for(let i=0; i<img.length; i++){
                img[i].setAttribute("draggable",'false');
                img[i].setAttribute("onclick",'openModal(event)');
                img[i].removeEventListener('touchstart',touchStart,false);
                img[i].removeEventListener('touchmove',touchMove,false);
                img[i].removeEventListener('touchend',touchEnd,false);
            }
            $newModal.classList.remove("show");
            $forReplaceModal.classList.remove("show2");
            $display.style.removeProperty('margin-left');
            $display.style.removeProperty('padding-top');
            $display.style.removeProperty('padding-left');
            $display.style.removeProperty('padding-right');
            $display.style.removeProperty('padding-bottom');
            $RFC.classList.remove('RorOactive');
            $OSC.classList.add('RorOactive');
            $addnewBTN.classList.remove('showANBTN');
            $span3.style.color = "darkgray";
            $span1.style.color = "goldenrod";
        }else{
            for(let i=0; i<img.length; i++){
                img[i].setAttribute("draggable",'true');
                img[i].setAttribute("onclick",'false');
                img[i].addEventListener('touchstart',touchStart,false);
                img[i].addEventListener('touchmove',touchMove,false);
                img[i].addEventListener('touchend',touchEnd,false);
            }
            $newModal.classList.add("show");
            $forReplaceModal.classList.add("show2");
            $display.style.marginLeft = "0" ;
            $display.style.paddingTop = "6%" ;
            $display.style.paddingLeft = "6%" ;
            $display.style.paddingRight = "6%" ;
            $display.style.paddingBottom = "12%" ;
            $RFC.classList.add('RorOactive');
            $OSC.classList.remove('RorOactive');
            $addnewBTN.classList.add('showANBTN');
            $span1.style.color = "darkgray";
            $span3.style.color = "goldenrod"
        };

    },false);
}

