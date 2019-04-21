var contador=0;
var numeroFotos=5;
var select;


function next(){
    if(contador < numeroFotos - 1){
	  contador++;
	} else {
	  contador = 0;
	} 
	document.foto.src = "imagenes/" + contador + '.jpg'; 
	document.formulario.rb[contador].checked=true; 
}

function previous(){
	if(contador > 0){
	  contador--;
	} else {
	  contador = 4;
	} 
	document.foto.src = "imagenes/" + contador + '.jpg'
	document.formulario.rb[contador].checked=true;
}

function cambiarFoto() { 
	var temContador;
	for(var i=0; i<select.length; i++) {
		if(select[i].checked) {
			temContador=i; 
		}
	}
	document.foto.src = "imagenes/" + temContador + '.jpg';
	contador = temContador;
}

window.onload = function() {   // window.onload hace que se ejecute la funcion al cargar la pagina
	
	setInterval("next()",5000); //ejecucion periodica de una funcion
	document.formulario.botonA.addEventListener('click',previous);
	document.formulario.botonB.addEventListener('click',next);

	select = document.formulario.rb;
	select[0].addEventListener('click',cambiarFoto);
	select[1].addEventListener('click',cambiarFoto);
	select[2].addEventListener('click',cambiarFoto);
	select[3].addEventListener('click',cambiarFoto);
	select[4].addEventListener('click',cambiarFoto);
	
}