var MYECHO = {
    bsa: 0,
    LMCAmean: 0,
    LADmean: 0,
    RCAmean: 0,
    LMCAsd: 0,
    LADsd: 0,
    RCAsd: 0,
    AVAmean: 0,
    AVAsd: 0,
    ROOTmean: 0,
    ROOTsd: 0
};
function calcBSA() {
    var height = parseFloat(document.getElementById("txtHT").value.replace(',', '.')); 
    var weight = parseFloat(document.getElementById("txtWT").value.replace(',', '.'));
    if (!isNaN(height) && !isNaN(weight)) {
        MYECHO.bsa = 0.024265 * Math.pow(height, 0.3964) * Math.pow(weight, 0.5378);           
    }
    else if (isNaN(height) && !isNaN(weight)) {
        MYECHO.bsa = 0.1 * Math.pow(weight, 0.6667);
    }
    else { //ht and wt are empty
        MYECHO.bsa = 0;
        
    }
    //now update the mean and ranges
    document.getElementById("BSA").innerHTML=MYECHO.bsa.toFixed(2);
    MYECHO.RCAmean = (0.26117 * Math.pow(MYECHO.bsa,0.39992)) - 0.02756;
    MYECHO.RCAsd = 0.02407 + (0.01597 * MYECHO.bsa);
    document.getElementById("RCAMean").innerHTML=(10 * (MYECHO.RCAmean)).toFixed(2);
    document.getElementById("RCARange").innerHTML=getRange("RCA");
    MYECHO.LADmean = (0.26108 * Math.pow(MYECHO.bsa,0.37893)) - 0.02852;
    MYECHO.LADsd = 0.01465 + (0.01996 * MYECHO.bsa);
    document.getElementById("LADMean").innerHTML=(10*MYECHO.LADmean).toFixed(2);
    document.getElementById("LADRange").innerHTML=getRange("LAD");
    MYECHO.LMCAmean = (0.31747 * Math.pow(MYECHO.bsa,0.36008)) - 0.02887;
    MYECHO.LMCAsd = 0.03040 + (0.01514 * MYECHO.bsa);
    document.getElementById("LMCAMean").innerHTML=(10*MYECHO.LMCAmean).toFixed(2);
    document.getElementById("LMCARange").innerHTML=getRange("LMCA");
    //and run the z-scores
    calcRCA();
    calcLMCA();
    calcLAD();
     

}

function calcRCA(){
    var RCA= parseFloat(document.getElementById("txtRCA").value.replace(',', '.'));
    if (!isNaN(RCA)){
        document.getElementById("RCAZ").innerHTML=getZScore("RCA",RCA);
        document.getElementById("RCAZ").className=[ZscoreFlag(getZScore("RCA",RCA))];

    }
    
}
function calcLAD(){
    var LAD= parseFloat(document.getElementById("txtLAD").value.replace(',', '.'));
    if (!isNaN(LAD)){
        document.getElementById("LADZ").innerHTML=getZScore("LAD",LAD);
        document.getElementById("LADZ").className=[ZscoreFlag(getZScore("LAD",LAD))];
    }
}
    function calcLMCA(){
    var LMCA= parseFloat(document.getElementById("txtLMCA").value.replace(',', '.'));
    if (!isNaN(LMCA)){
        document.getElementById("LMCAZ").innerHTML=getZScore("LMCA",LMCA);
        document.getElementById("LMCAZ").className=[ZscoreFlag(getZScore("LMCA",LMCA))];

    }
}

function getRange(site){
    switch(site){
        case "RCA":
            return lower(MYECHO.RCAmean,MYECHO.RCAsd)+ " - " +upper(MYECHO.RCAmean,MYECHO.RCAsd);
        case "LAD":
            return lower(MYECHO.LADmean,MYECHO.LADsd)+ " - " +upper(MYECHO.LADmean,MYECHO.LADsd);
        case "LMCA":
            return lower(MYECHO.LMCAmean,MYECHO.LMCAsd)+ " - " +upper(MYECHO.LMCAmean,MYECHO.LMCAsd);
    }
}
function getZScore(site,score){
    switch(site){
        case "RCA":
            return ((score/10 - MYECHO.RCAmean)/MYECHO.RCAsd).toFixed(2);
        case "LAD":
            return ((score/10 - MYECHO.LADmean)/MYECHO.LADsd).toFixed(2);
        case "LMCA":
            return ((score/10 - MYECHO.LMCAmean)/MYECHO.LMCAsd).toFixed(2);
            
    }
}
function upper(mean,sd){
    return (10*(mean+1.65*sd)).toFixed(2);
}

function lower(mean,sd){
    return (10*(mean-1.65*sd)).toFixed(2);
}
function ZscoreFlag(zScore){
    if (zScore >=1.65 && zScore<1.96||zScore>-1.96&&zScore<=-1.67){
        return "borderline";
    }
    else if (zScore>=1.96&& zScore<3||zScore>-3&&zScore<=-1.96){
        return "mild";
    }
    else if (zScore>=3&& zScore<4||zScore>-4&&zScore<=-3){
        return "moderate";
    }
    else if (zScore>=4||zScore<=-4){
        return "severe";
    }
    else return "normal";
}
//Copyright (c) 2008: Dan Dyar

//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.