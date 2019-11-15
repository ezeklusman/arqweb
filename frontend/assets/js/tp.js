const base_url = "http://node11.codenvy.io:37803";


var row_structure = "<td><button class=\"button-modificar btn btn-primary btn-round\" onclick=\"modificar(this)\"><i class=\"now-ui-icons ui-2_settings-90\"></i> Modificar</button><button class=\"button-guardar btn btn-success btn-round\" onclick=\"guardar(this)\"><i class=\"now-ui-icons ui-1_check\"></i> Guardar</button><button class=\"button-eliminar btn btn-danger btn-round\" onclick=\"eliminar(this)\"><i class=\"now-ui-icons ui-1_simple-remove\"></i> Eliminar</button><button class=\"button-cancelar btn btn-primary btn-round\" onclick=\"cancelar(this)\"><i class=\"now-ui-icons ui-1_simple-remove\"></i> Cancelar</button><img src=\"assets/img/loading.gif\" class=\"loading\"/></td>";

function guardar(elm){
	if($(elm).parents("tr").hasClass("nuevorow")){
		crear(elm);
	} else {
		actualizar(elm);
	};
};


function cancelar(elm){
	resetRows(elm);
};


function resetRows(elm){
	$(elm).parents("tbody").children("tr").removeClass("selected");
	$(elm).parents("tbody").children("tr.nuevorow").fadeOut(300);
	setTimeout(function(){
  		$(elm).parents("tbody").children("tr.nuevorow").remove();
	}, 300);
};