function preview(obj){

    let $pContainer = document.getElementById('previewContainer');
    $pContainer.innerHTML = "" ;

    if(obj.files.length>20){

        $pContainer.innerHTML = "" ;
        function setAttToInput(att){
            document.getElementById('register').setAttribute('type',att);
        }

        setAttToInput('');
        setAttToInput('file');

        window.alert("一度に登録できるステッカーは20個までです");

    }else{

        for( let i=0; i<obj.files.length; i++ ){
            $pContainer.innerHTML += '<div class="previewInfo" ><img class="previewImg" src="" ><input class="previewName" type="text"></div>';
        }

        let pImg = document.getElementsByClassName('previewImg');

        for( let i=0; i<obj.files.length; i++ ){

            let FR = new FileReader();
            FR.onload =(()=>{
                pImg[i].src = FR.result;
            })

            FR.readAsDataURL(obj.files[i]);
        }

        let $pName = document.getElementsByClassName('previewName');
        let $rName = document.getElementsByClassName('registerName');
        let $rNumber = document.getElementsByClassName('registerNumber');
        let $rGazou = document.getElementsByClassName('registerGazou');
        let $rSort = document.getElementsByClassName('registerSort');
        let $decide = document.getElementById('decide');

        for( let i=0; i<$pName.length; i++ ){
            $pName[i].addEventListener('keyup',function(){

                for( let j=0; j<$pName.length; j++ ){
                    if( $pName[j].value.match(/\S/g) ){
                        $decide.disabled = false ;
                        $rName[j].value = $pName[j].value;
                    }else{
                        $decide.disabled = true ;
                        break ;
                    }
                }

            },false)
        }
        for( let i=0; i<obj.files.length; i++ ){
            if(obj.files[i].name.length == 13){
                $rNumber[i].value = obj.files[i].name.slice(0,-6);
                $rSort[i].value = obj.files[i].name.slice(-5,-4);
            }else{
                $rNumber[i].value = obj.files[i].name.slice(0,-4);
                $rSort[i].value = 1
            }
        }
        for( let i=0; i<obj.files.length; i++ ){
            $rGazou[i].value = obj.files[i].name;

        }

    }
}
