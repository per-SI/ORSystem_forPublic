const $tableH = document.getElementById('tableHeader');
const $datesCell = document.getElementsByClassName('date');
let $attached ;
const dayOfWeek = ["日","月","火","水","木","金","土"];
const now = new Date();
let standardDate = now ;

let SPholiday ;
let SPHYear = [];
let SPHMonth = [];
let SPHDate = [];
let holidayName = [] ;

function setCalendar(standardDate){
    let startDayNum = (new Date(standardDate.getFullYear(),standardDate.getMonth(),1)).getDay();
    let finalDate = (new Date(standardDate.getFullYear(),standardDate.getMonth()+1,0)).getDate();
    let lastMfinalD = (new Date(standardDate.getFullYear(),standardDate.getMonth(),0)).getDate();
    let j = startDayNum+finalDate ;
    $tableH.textContent = standardDate.getFullYear()+"/"+(standardDate.getMonth()+1);
    console.log(finalDate,lastMfinalD);
    for( let i=0; i<startDayNum; i++ ){
        $datesCell[i].textContent = lastMfinalD-startDayNum+i+1 ;
        $datesCell[i].classList.remove('attached') ;
        $datesCell[i].classList.remove('holiday') ;
        $datesCell[i].classList.add('lastM');
    }
    for( let i=startDayNum,k=1; i<j ; i++,k++ ){
        $datesCell[i].textContent = k ;
        $datesCell[i].classList.add('attached') ;
        $datesCell[i].classList.remove('holiday') ;
        $datesCell[i].classList.remove('lastM');
        $datesCell[i].classList.remove('nextM');
    }
    for( let i=j,k=1; i<$datesCell.length; i++,k++ ){
        $datesCell[i].textContent = k ;
        $datesCell[i].classList.remove('attached') ;
        $datesCell[i].classList.remove('holiday') ;
        $datesCell[i].classList.add('nextM');
    }
    $attached = document.getElementsByClassName('attached');

}

function setSPHoliday(){
    let sYear = standardDate.getFullYear();
    let sMonth = standardDate.getMonth()+1;
    let h = holidayName.length;
    for( let i=0; i<h; i++ ){
        if( SPHYear[i] === sYear && SPHMonth[i] === sMonth && $attached[SPHDate[i]-1].childElementCount !==1 ){
            let holidayTag = document.createElement("div");
            holidayTag.setAttribute('class','SPHoliday');
            holidayTag.textContent = holidayName[i] ;
            $attached[SPHDate[i]-1].appendChild(holidayTag);
            $attached[SPHDate[i]-1].classList.add('holiday');
        }
    }
}

document.addEventListener('DOMContentLoaded',async function(){
    try{
        let api_key = "AIzaSyD7U939s1HROf7BQrA8yPi_i_6wzGtPD_A";
        let api_id = "ja.japanese#holiday@group.v.calendar.google.com";
        let startD = new Date();
        let endD = new Date();
        startD.setDate(startD.getDate()-365);
        endD.setDate(endD.getDate()+365);
        startD = startD.toISOString();
        endD = endD.toISOString();
        const res = await axios.get('https://www.googleapis.com/calendar/v3/calendars/'+encodeURIComponent(api_id)+'/events?key='+api_key+'&timeMin='+startD+'&timeMax='+endD+'&orderBy=startTime'+'&singleEvents=true');
        console.log(res.data);
        let j = res.data.items.length;
        for( let i=0; i<j; i++ ){
            SPholiday = new Date(res.data.items[i].start.date);
            SPHYear.push(SPholiday.getFullYear());
            SPHMonth.push(SPholiday.getMonth()+1);
            SPHDate.push(SPholiday.getDate());
            holidayName.push(res.data.items[i].summary);
            console.log(SPHYear[i]+"/"+SPHMonth[i]+"/"+SPHDate[i]+"("+holidayName[i]+")");
        }


        setCalendar(standardDate);
    }catch(error){
        console.log(error);
    }
})

function changeMonth(event){
    if(event.target.classList.contains('last')){
        standardDate = new Date(standardDate.getFullYear(),standardDate.getMonth()-1,1);
        setCalendar(standardDate);
        setSPHoliday();
    }else{
        standardDate = new Date(standardDate.getFullYear(),standardDate.getMonth()+1,1);
        setCalendar(standardDate);
        setSPHoliday();
    }
}

let calendar = document.getElementById('calendar');

function openCalendar(event){
    calendar.classList.add('openCal');
    let j = $datesCell.length;
    let clickedId = event.target.id ;
    for( let i=0; i<j; i++){
        $datesCell[i].setAttribute("onclick","closeCalendar(event,"+clickedId+")");
    }
    setSPHoliday();
}

function closeCalendar(event,clickedId){
    let y_m ;
    if(event.target.id === "coverPage"){

    }else{
        if(event.target.classList.contains('lastM')){
            let dateForSet = new Date(standardDate.getFullYear(),standardDate.getMonth()-1,1);
            y_m = dateForSet.getFullYear() +"-"+ (dateForSet.getMonth()+1);
        }else if(event.target.classList.contains('nextM')){

            let dateForSet = new Date(standardDate.getFullYear(),standardDate.getMonth()+1,1);
            y_m = dateForSet.getFullYear() +"-"+ (dateForSet.getMonth()+1);
        }else{
            y_m = standardDate.getFullYear() +"-"+ (standardDate.getMonth()+1);
        }
        /*if(event.target.firstElementChild){
            event.target.removeChild(event.target.firstElementChild);
        }*/
    }
    if($newSheetContainer.classList.contains('open4')){
        if(!event.target.classList.contains('date')){
            let dateNode = event.target.parentNode ;
            event.target.parentNode.removeChild(event.target.parentNode.firstElementChild);
            document.getElementById('deliveryDate').textContent = y_m + "-" + dateNode.textContent;
        }else{
            if(event.target.firstElementChild){
                event.target.removeChild(event.target.firstElementChild);
            }
            document.getElementById('deliveryDate').textContent = y_m + "-" + event.target.textContent;
        }
    }else if(clickedId){
        if(!event.target.classList.contains('date')){
            let dateNode = event.target.parentNode ;
            event.target.parentNode.removeChild(event.target.parentNode.firstElementChild);
            clickedId.textContent = y_m + "-" + dateNode.textContent;
        }else{
            if(event.target.firstElementChild){
                event.target.removeChild(event.target.firstElementChild);
            }
            clickedId.textContent = y_m + "-" + event.target.textContent;
        }

        console.log(clickedId);
    }
    calendar.classList.remove('openCal');
}
