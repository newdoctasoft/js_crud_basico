var filaSeleccionada = null;
var productoNuevo={
	codigo:"",
	descripcion:"",
	precio:0
}
var productos = [ ];
 var acumulador=0;

function enviar() { 
			
      if (validar()) {
        var formularioDato = leerFormulario();   
        if (filaSeleccionada == null)
            insertar(formularioDato); 
        else
            editar(formularioDato);
        reiniciar();
    }
}

 

function leerFormulario() {
    var formularioDato = {};
    formularioDato["codigo"] = document.getElementById("codigo").value;
    formularioDato["descripcion"] = document.getElementById("descripcion").value;
    formularioDato["precio"] = document.getElementById("precio").value; 
	console.log(formularioDato);
    return formularioDato;
}


 

function insertar(dato) {
	console.log('insertarFormulario');
    var tabla = document.getElementById("listadoProductos").getElementsByTagName('tbody')[0];
    var nuevaFila = tabla.insertRow(tabla.length);
    columna1 = nuevaFila.insertCell(0);
    columna1.innerHTML = dato.codigo;
    columna2 = nuevaFila.insertCell(1);
    columna2.innerHTML = dato.descripcion;
    columna3 = nuevaFila.insertCell(2);
    columna3.innerHTML = dato.precio;
   
    columna4 = nuevaFila.insertCell(3);
    columna4.innerHTML = `<a onClick="buscar(this)">EDITAR</a>
                       <a onClick="eliminar(this)">ELIMINAR</a>`;
					   
	productoNuevo.codigo=dato.codigo;
	productoNuevo.codigo=dato.descripcion;	
	productoNuevo.codigo=dato.precio;	

	productos.push(productoNuevo);
	 precioFactura=productoNuevo.precio;
	
}
 

function reiniciar() {
    document.getElementById("codigo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = ""; 
    filaSeleccionada = null;
}




 function eliminar(columna) {
    if (confirm('Estas Seguro que quiere eliminar el producto ?')) {
        fila = columna.parentElement.parentElement;
        document.getElementById("listadoProductos").deleteRow(fila.rowIndex);
        reiniciar();
    }
}


 
 
  function buscar(fila) {
    filaSeleccionada = fila.parentElement.parentElement;
    document.getElementById("codigo").value = filaSeleccionada.cells[0].innerHTML;
    document.getElementById("descripcion").value = filaSeleccionada.cells[1].innerHTML;
    document.getElementById("precio").value = filaSeleccionada.cells[2].innerHTML; 
}
 
 
 
 
  function editar(formularioDato) {
    filaSeleccionada.cells[0].innerHTML = formularioDato.codigo;
    filaSeleccionada.cells[1].innerHTML = formularioDato.descripcion;
    filaSeleccionada.cells[2].innerHTML = formularioDato.precio;
  
}
 
 
 
 function validar() {
    esValido = true;
    if (document.getElementById("codigo").value == "") {
        esValido = false;
        document.getElementById("validarCodigo").classList.remove("hide");
    } else {
        esValido = true;
        if (!document.getElementById("validarCodigo").classList.contains("hide"))
            document.getElementById("validarCodigo").classList.add("hide");
    }
    return esValido;
}


function cantidadProductos(){
	 var f;
	 var contador=0;
  for(f=0;f<=productos.length;f++)
  {
    contador++;
  }
	 document.getElementById("cantidad").innerHTML = contador-1;
}



function calcularCosto(){
	var f; 
	
	 for(let producto of productos)  
	 {
		  acumulador=acumulador+producto.precio;
		  console.log(acumulador);
	 } 
   acumulador=100;
	 document.getElementById("precioTotal").innerHTML = acumulador;
}


function calcularDescuento(){
	var precioFinal;
	var porcentajeDescuento=prompt('Ingrese un descuento:',''); 
	precioFinal=acumulador-(acumulador*porcentajeDescuento)/100;
	
	 document.getElementById("descuento").innerHTML = precioFinal;
}