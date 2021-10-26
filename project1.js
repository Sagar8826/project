et m = require("minimist");
let fs =require("fs");
let ax = require("axios");
let jsdom = require("jsdom");

let a =m(process.argv);

let promise = ax.get(a.source);
promise.then(function(response){
    let html = response.data;

    let dom =new jsdom.JSDOM(html);
    let document = dom.window.document;
    let companies = [];
    document.querySelectorAll("div#nameSearch2 div.multiColumn a").forEach(Name=>{
        let c={
            name:Name.textContent,
            jobs:[]
        }
        companies.push(c);
        let link = Name.href;
        prof(companies[companies.length-1],link);
    });
    //console.log(companies);
})
.catch(function(err){
    console.log(err);
})


function prof(c , link){
    let promise =ax.get(link);
    promise.then(function(response){
        let html=response.data;
        let dom = new jsdom.JSDOM(html);
        let document=dom.window.document;
        let profiles = document.querySelectorAll("div.list article.jobTuple.bgWhite.br4.mb-8");
        console.log(profiles.length);
        for(let i=0;i < profiles.length;i++){
            let jobdetails={
                name:""
            };
            console.log();
            profiles[i].querySelectorAll("div.info.fleft a.title").foreach(link=>{
                jobdetails.name=link.title;
                console.log(jobdetails.name);

            });
            
            

        }
    })
    .catch(function(err){
        console.log(err);
    })

}


// node .\project.js --source=https://www.naukri.com/top-company-jobs  
