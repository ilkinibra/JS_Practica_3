let icon=document.getElementById("icon");
let table=document.getElementById("table");
let trashIcon=document.getElementById("trashIcon")
let deletedTr=[];

icon.onclick=function(){
    icon.previousElementSibling.click();
}
let count=1;
icon.previousElementSibling.onchange=function(e){
   for (const file of e.target.files) {
       let reader=new FileReader();
       reader.onloadend=function(e){
        let tr=document.createElement("tr");
        tr.setAttribute("id",count)
        let tdImage=document.createElement("td");
        let img=document.createElement("img");
        img.setAttribute("src",e.target.result);
        img.style.width="100px";
        tdImage.appendChild(img);
        
        let tdImageName=document.createElement("td");
        tdImageName.innerText=file.name;

        let tdImageSize=document.createElement("td");
        tdImageSize.innerText=file.size;

        let tdCheckbox=document.createElement("td");
        let input=document.createElement("input");
        input.setAttribute("type","checkbox");
        input.onclick=function(){
            if(input.checked){
              deletedTr.push(tr.getAttribute("id"));
              console.log(deletedTr);
            }
            else{
               let newArr= deletedTr.filter(item=>item!=tr.getAttribute("id"));
               deletedTr=newArr;
                console.log(deletedTr);
            }
        }
        tdCheckbox.appendChild(input);
        
        tr.append(tdImage,tdImageName,tdImageSize,tdCheckbox);
        table.lastElementChild.appendChild(tr);

        count++

       }
       reader.readAsDataURL(file);
   }
   
}
trashIcon.onclick=function(){
    let allTr=document.querySelectorAll("tbody tr");
    allTr.forEach(tr=>{
        deletedTr.forEach(trDeleted=>{
            if(tr.getAttribute("id")==trDeleted){
                tr.remove();
            }
        })
    })
}

