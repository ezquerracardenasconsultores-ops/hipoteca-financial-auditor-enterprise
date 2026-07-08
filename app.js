function calcular(){
const capital=parseFloat(document.getElementById('capital').value);
const tea=parseFloat(document.getElementById('tea').value);
const plazo=parseInt(document.getElementById('plazo').value);

const tem=Math.pow(1+tea/100,1/12)-1;
const cuota=capital*((tem*Math.pow(1+tem,plazo))/(Math.pow(1+tem,plazo)-1));

let vpn=0,vpTotal=0,tiempo=0;
for(let i=1;i<=plazo;i++){
 const vp=cuota/Math.pow(1+tem,i);
 vpn+=vp;
 vpTotal+=vp;
 tiempo+=i*vp;
}
document.getElementById('cuota').textContent='S/ '+cuota.toFixed(2);
document.getElementById('tem').textContent=(tem*100).toFixed(6)+'%';
document.getElementById('vpn').textContent='S/ '+vpn.toFixed(2);
document.getElementById('duracion').textContent=(tiempo/vpTotal).toFixed(2)+' meses';
}
