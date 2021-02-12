const $rankModal = document.getElementById("rankModal");

class rankInfomation{
    constructor(number,rank){
        this.number = number;
        this.rank = rank;
    }

    setRank(){
        let rankTarget = document.getElementsByName(this.number);
        for(let i=0; i<rankTarget.length; i++){
            let rankTargetP = rankTarget[i].parentNode ;
            if(rankTargetP.childElementCount === 2){
                rankTargetP.removeChild(rankTargetP.lastElementChild);
            }
            let rankDiv = document.createElement("div");
            rankTargetP.appendChild(rankDiv);
            rankDiv.textContent = this.rank ;
            rankDiv.setAttribute("class","stickerRank");
        }
    }

}

function openRankModal(){
    $rankModal.classList.add("openRankModal");
    $cover.classList.add('cover');
}

async function getStickerRanking(){
    try{
        let startDate = document.getElementById("startOfPeriod").textContent;
        let endDate = document.getElementById("endOfPeriod").textContent;
        const res = await axios.get("/getStickerRanking/"+startDate+"/"+endDate);
        console.log(res.data);
        rankInfo=[];
        let j = res.data.length;
        for(let i=0; i<j; i++){
            rankInfo.push(new rankInfomation(res.data[i].number,res.data[i].rank));
            rankInfo[i].setRank();
        }
        closeModal();
    }catch(error){
        console.log(error);
    }
}
