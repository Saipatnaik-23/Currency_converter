const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";



let dropdown=document.querySelectorAll(".select_container select");

let fromCurr=document.querySelector(".fromselect");
let toCurr=document.querySelector(".toselect");
let btn=document.querySelector("button");
let showingVal=document.querySelector(".text");

for (let select of dropdown)
{  
  for(currCode in countryList)
   {
    // console.log(currCode);
      let newOption=document.createElement("option");
      newOption.value=currCode; //option ki value set karta hai
    //   console.log(newOption);
      newOption.text=currCode; // and ye text problem kahan aa rhi thi coz there were two select
      if(select.name==="from" && currCode==="USD")
      {
        newOption.selected="selected";
      }
      else if(select.name==="To" && currCode==="INR")
      {
        newOption.selected="selected";
      }
      select.appendChild(newOption);
   }
    select.addEventListener("change",(evt)=>
    {
      updateFlag(evt.target);
    });
}


const exchangeRate= async()=>
{
      let entryAmt=document.querySelector("#input_box");
      let enteredAmt=entryAmt.value;
     if(enteredAmt==="" || enteredAmt <1)
     {
        enteredAmt=1;
        entryAmt.value="1";
     }
    // console.log(fromCurr.value);
     const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
     let response = await fetch(URL);
    //  console.log(response.json);
     let data= await response.json();
    //  console.log(data);
     let rate= data[toCurr.value.toLowerCase()];
    //  console.log(rate);


    let totalAmt=enteredAmt*rate;
    showingVal.textContent=`${enteredAmt} ${fromCurr.value} = ${totalAmt} ${toCurr.value}`;
  
  }


const updateFlag = (element)=>
{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  console.log(countryCode);
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
}
btn.addEventListener("click",(evt)=>
  {
    evt.preventDefault();
    exchangeRate();
  })

  window.addEventListener("load",()=>
  {
    exchangeRate();
  })