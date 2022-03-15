function monoCross(paternal, maternal, total, observedArray){
    var paternalNum = charToNum(paternal); //10
    var maternalNum = charToNum(maternal); //10

    var phenoArray = getPhenotype(paternalNum, maternalNum);  //[3, 1]
    var expectedArray = [];
    for (let i=0; i<2; i++){
       const expected =  (phenoArray[i]/4)*total;
       expectedArray.push(expected);
    }
    
    var output = 0;
    for (let i=0; i<2; i++){
        output += chiSquareEq(observedArray[i], expectedArray[i]);
    }
    
    return output;
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

    return ([dominant, recessive]);
}

function charToNum(geno){
    var output = ""
    for (let i=0; i<2;i++){
        if ((geno[i]).toUpperCase() == "D"){
            output += "0";
        } 
        else {
            output += "1";
        }
    }

    return output;
}

function chiSquareEq(O, E){
    var output = Math.pow((O - E), 2);
    output /= E;

    return output;
}

function displayTextBox(){
    var selected = document.getElementById('select').value;
    if (selected == "1"){
        document.getElementById('textBox').innerHTML = "<input type='text' id='box1' placeholder='Paternal Genotype'>x<input type='text' id='box2' placeholder='Maternal Genotype'> <br><br>Observed <br>Total: <input type='text' id='total' placeholder='Total'> Dominant: <input type='text' id='dominant' placeholder='Dominant'> Recessive: <input type='text' id='recessive' placeholder='Recessive'>";
    } 
    else if (selected == '2') {
       document.getElementById('textBox').innerHTML = "<input type='text' id='box1' placeholder='Paternal Genotype'>x<input type='text' id='box2' placeholder='Maternal Genotype'><br><input type='text' id='box3' placeholder='Paternal Genotype'>x<input type='text' id='box4' placeholder='Maternal Genotype'><br><br>Observed <br>Total: <input type='text' id='total' placeholder='total'> Dominant Dominant: <input type='text' id='domDom' placeholder='Dominant Dominant'> Dominant Recessive: <input type='text' id='domRes' placeholder='Dominant Recessive'>Recessive Dominant: <input type='text' id='recDom' placeholder='Recessive Dominant'>Recessive Recessive: <input type='text' id='recRec' placeholder='Recessive Recessive'>";
    }
}

function calcClick(){
    const selected = document.getElementById('select').value;
    const paternal = document.getElementById('box1').value; 
    const maternal = document.getElementById('box2').value;
    const total = document.getElementById('total').value;

    if (selected == "1"){
        const dominant = document.getElementById('dominant').value;
        const recessive = document.getElementById('recessive').value;
        const observedArray = [dominant, recessive];

        document.getElementById('output').innerHTML = monoCross(paternal, maternal, total, observedArray);
    }
    else if (selected == "2"){
        const paternal1 = document.getElementById('box3').value;
        const maternal1 = document.getElementById('box4').value;
        document.getElementById('output').innerHTML = diCross(paternal, maternal, paternal1, maternal1);  
    }
}