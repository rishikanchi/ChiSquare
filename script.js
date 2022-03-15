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

function diCross(patTrait1, matTrait1, patTrait2, matTrait2, total, observedArray){
    patTrait1 = charToNum(patTrait1);
    matTrait1 = charToNum(matTrait1);
    patTrait2 = charToNum(patTrait2);
    matTrait2 = charToNum(matTrait2);

    var t1pheno = getPhenotype(patTrait1, matTrait1);
    var t2pheno = getPhenotype(patTrait2, matTrait2);

    var fullPheno = [];
    var t1Ratio;
    var t2Ratio;
    for (let i=0; i<2; i++){
        t1Ratio = t1pheno[i];
        for (let j=0; j<2; j++){
            t2Ratio = t2pheno[j];
            fullPheno.push(t1Ratio*t2Ratio);
        }
    }

    var expectedArray =[];
    for (let i=0; i<4; i++){
        const expected =  (fullPheno[i]/16)*total;
        expectedArray.push(expected);
     }

    var output = 0;
    for (let i=0; i<4; i++){
        output += chiSquareEq(observedArray[i], expectedArray[i]);
    }
    
    return output;
}

function sexLinkedMono(paternal, maternal, total, observedArray){
    paternal = charToNumSex(paternal);
    maternal = charToNumSex(maternal);

    var expectedRatio = getPhenotypeSex(paternal, maternal);
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

function getPhenotypeSex(paternal, maternal){
    var domMale = 0;
    var domFemale = 0;
    var recMale = 0;
    var recFemale = 0;
    var curPaternal;
    var curMaternal;

    for (let i=0; i<2; i++){
        curPaternal = paternal[i]
        for (let j=0; j<2; j++){
            curMaternal = maternal[j];
            const multi = curMaternal*curPaternal;
            if (multi == 2){
                domMale++;
            }
            else if (multi == 3){
                recMale++;
            }
            else if (multi == 4 || multi == 6){
                domFemale++;
            }
            else if (multi == 9){
                recFemale++;
            }
        }
    }

    return ([domMale, recMale, domFemale, recFemale]);
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

function charToNumSex(geno){
    var output = ""
    for (let i=0; i<2;i++){
        if ((geno[i]).toUpperCase() == "D"){
            output += "2";
        } 
        else if ((geno[i]).toUpperCase() == "R"){
            output += "3";
        }
        else {
            output += "1"
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
        document.getElementById('textBox').innerHTML = "<input type='text' id='box1' placeholder='Paternal Genotype'>x<input type='text' id='box2' placeholder='Maternal Genotype'> <br><br>Observed <br>Total: <input type='text' id='total' placeholder='Total'><br> Dominant: <input type='text' id='dominant' placeholder='Dominant'> <br>Recessive: <input type='text' id='recessive' placeholder='Recessive'>";
    } 
    else if (selected == '2') {
       document.getElementById('textBox').innerHTML = "Trait 1 (T1): <input type='text' id='box1' placeholder='Paternal Genotype'>x<input type='text' id='box2' placeholder='Maternal Genotype'><br>Trait 2 (T2): <input type='text' id='box3' placeholder='Paternal Genotype'>x<input type='text' id='box4' placeholder='Maternal Genotype'><br><br>Observed <br>Total: <input type='text' id='total' placeholder='Total'><br> T1 Dominant T2 Dominant: <input type='text' id='domDom' placeholder='Dominant Dominant'><br> T1 Dominant T2 Recessive: <input type='text' id='domRec' placeholder='Dominant Recessive'><br>T1 Recessive T2 Dominant: <input type='text' id='recDom' placeholder='Recessive Dominant'><br>T1 Recessive T2 Recessive: <input type='text' id='recRec' placeholder='Recessive Recessive'>";
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
        const domDom = document.getElementById('domDom').value;
        const domRec = document.getElementById('domRec').value;
        const recDom = document.getElementById('recDom').value;
        const recRec = document.getElementById('recRec').value;
        document.getElementById('output').innerHTML = diCross(paternal, maternal, paternal1, maternal1, total, [domDom, domRec, recDom, recRec]);  
    }
}