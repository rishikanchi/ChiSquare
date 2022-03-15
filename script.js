function monoCross(paternal, maternal){
    var paternalNum = charToNum(paternal);
    var maternalNum = charToNum(maternal);
}

function diCross(){
    
}

function getPhenotype(paternal, maternal){
    var curPaternal;
    var curMaternal;
    var dominant = 0;
    var recessive = 0;

    for (let i=0; i<2; i++){
        curPaternal = parseInt(paternal[i]);

        for (let j=0; j<2; j++){
            curMaternal = parseInt(maternal[j]);
            if (curPaternal*curMaternal == 0){
                dominant++;
            }
            else{
                recessive++
            }
        }
    }

    return [dominant, recessive];
}

function charToNum(geno){
    for (let i=0; i<2;i++){
        if ((geno[i]).toUpperCase() == "D"){
            geno[i] = "0";
        } 
        else {
            geno[i] = "1";
        }
    }

    return geno;
}

function displayTextBox(){
    var selected = document.getElementById('select').value;
    if (selected == "1"){
        document.getElementById('textBox').innerHTML = "<input type='text' id='box1' placeholder='Paternal Genotype'>x<input type='text' id='box2' placeholder = 'Maternal Genotype'>";
    } 
    else if (selected == '2') {
       document.getElementById('textBox').innerHTML = "<input type='text' id='box1' placeholder='Paternal Genotype'>x<input type='text' id='box2' placeholder='Maternal Genotype'><br><input type='text' id='box3' placeholder='Paternal Genotype'>x<input type='text' id='box4' placeholder='Maternal Genotype'>";
    }
}

function calcClick(){
    const selected = document.getElementById('select').value;
    const paternal = document.getElementById('box1').value; //DD RR -> 00 11
    const maternal = document.getElementById('box2').value;

    if (selected == "1"){
        document.getElementById('output').innerHTML = monoCross(paternal, maternal);
    }
    else if (selected == "2"){
        const paternal1 = document.getElementById('box3').value;
        const maternal1 = document.getElementById('box4').value;
        document.getElementById('output').innerHTML = diCross(paternal, maternal, paternal1, maternal1);  
    }
}