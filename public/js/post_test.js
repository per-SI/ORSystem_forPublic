async function test_post(){
    try{
        const res = await axios.post("/test_post",{
            id: 123,
            name: "satoi"
        });
        console.log(res.data);
    }catch(error){
        console.log(error);
    }
}
