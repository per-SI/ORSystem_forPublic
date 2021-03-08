async function test_post(){
    try{
        const res = await axios.post("/test_post",{
            name: "satoi"
        });
        console.log(res.data);
    }catch(error){
        console.log(error);
    }
}
