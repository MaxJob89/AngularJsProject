

var add=new Array();

function Add() {
    var sk=document.getElementById("ski");
    var skadd = document.getElementById("skills");

    var selezione=sk.selectedOptions;
    for (var i=0;i<selezione.length;i++)
        add.push(selezione[i]);



    for (var i=0;i<add.length;i++)
    {
        skadd.add(add[i]);
    }
    add=[];

}//end function Add()


function Sub() {

    var sk=document.getElementById("ski");
    var skadd = document.getElementById("skills");

    var selezione=skadd.selectedOptions;
    for (var i=0;i<selezione.length;i++)
        add.push(selezione[i]);


    for (var i=0;i<add.length;i++)
    {
        sk.add(add[i]);
    }

    add=[];
}// end function Less()

function SelectSkill() {

    var sel=document.getElementById("skills");
    for (var i = 0; i < sel.length; i++) {
        sel[i].selected = true;
    }
}



function Begin(home) {

    document.getElementById("number").value="1";
    document.getElementById("presentPage").innerHTML="1";

    document.home.submit();

}


function Back(home) {

    var numero=document.getElementById("number").value;

    if(numero>=2)
        numero--;

    document.getElementById("number").value=numero.toString();
    document.getElementById("presentPage").innerHTML=numero;

    document.home.submit();


}


function Next(home) {

    var numero=document.getElementById("number").value;
    var maxPage=document.getElementById("totalPageInput").value;



    if(numero<maxPage)
     numero++;

    document.getElementById("number").value=numero.toString();
    document.getElementById("presentPage").innerHTML=numero;
    document.home.submit();

}



function End(home) {

    var maxPage=document.getElementById("totalPageInput").value;



    document.getElementById("number").value=maxPage;
   document.getElementById("presentPage").innerHTML=maxPage;
    document.home.submit();
}










/**
 * Created by massimo_buonocore on 31/03/17.
 */
