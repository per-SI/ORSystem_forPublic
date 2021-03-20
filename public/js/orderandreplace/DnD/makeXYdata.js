let X = [];
let Y = [];
let codes = [];
let ncodes = [];
let scodes = [];

const makeXYdata =() => {
    item = document.getElementsByClassName('imgParent');
    img = document.getElementsByClassName('stickerImg');
    let j = item.length;
    X = [];
    Y = [];
    codes = [];
    ncodes = [];
    scodes = [];

    if(item.length){
        for( let i=0; i<j; i++ ){
            let x = Number(item[i].getAttribute("x"))+1;    let y = Number(item[i].getAttribute("y"))+1;
            let code = Number(img[i].getAttribute("code"));
            if(x!==1001 && y!==1001){
                X.push(x);  Y.push(y); codes.push(code);
            }
        }
    }else{
        X.push("nothing"); Y.push("nothing"); codes.push("nothing");
    }

    let newP = document.getElementsByClassName('new');
    let k = newP.length ;
    if( k !== 0){
        for( let i=0; i<k; i++ ){
            ncodes.push(newP[i].firstElementChild.getAttribute('code'));
        }
    }else{
        ncodes.push("nothing");
    }


    let subP = document.getElementsByClassName('sub');
    let l = subP.length ;
    if( l !== 0 ){
        for( let i=0; i<l; i++ ){
            scodes.push(subP[i].firstElementChild.getAttribute('code'));
        }
    }else{
        scodes.push("nothing");
    }

    X = X.toString();
    Y = Y.toString();
    codes = codes.toString();
    ncodes = ncodes.toString();
    scodes = scodes.toString();

    console.log(ncodes);
    console.log(scodes);

}
