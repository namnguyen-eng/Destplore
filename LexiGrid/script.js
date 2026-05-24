document
.getElementById(
"generate"
)

.addEventListener(

"click",

generate

);



function generate(){

const keyword =
document

.getElementById(
"keyword"
)

.value

.trim()

.toUpperCase();


const words =
document

.getElementById(
"words"
)

.value

.split("\n")

.map(

x=>

x.trim()

.toUpperCase()

)

.filter(Boolean);



if(

words.length
!==

keyword.length

){

alert(

"Not possible"

);

return;

}



let placements=[];

const keywordColumn=5;



for(

let i=0;

i<words.length;

i++

){

const word=
words[i];

const letter=
keyword[i];

const match=
word.indexOf(letter);


if(match===-1){

alert(

"Not possible"

);

return;

}


placements.push({

word,

start:

keywordColumn-
match

});

}


render(

placements,

"full",

document
.getElementById(
"full"
)

);


render(

placements,

"empty",

document
.getElementById(
"empty"
)

);


render(

placements,

"sparse",

document
.getElementById(
"sparse"
)

);

}
