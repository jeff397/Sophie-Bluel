async function submitId() {
   
    let credentials = {
        email: "sophie.bluel@test.tld",
        password :"S0phie",
    };
    let result = await postLogin(credentials);
    console.log(result);
    alert(result.message);

    
}


submitId();