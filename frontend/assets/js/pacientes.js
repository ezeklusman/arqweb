  var html_structure = "<tr>" +
                    "<td><div class=\"dato nombre\">*Nombre*</div><input class=\"nombre\"></input></td>"
                    +"<td><div class=\"dato dni\">*Dni*</div><input class=\"dni\"></input></td>"
                    +"<td><div class=\"dato obrasocial\">*ObraSocial*</div><input class=\"obrasocial\"></input></td>"
                    +row_structure
                    +"</tr>";

var especialidades = "";

  $(document).ready(function(){
    //Traemos los Pacientes
    $.get(base_url+"/pacientes", function(data, status){
        var json_obj = data;
        var output="";
        for (var i in json_obj) 
                {
                    html_row = html_structure;
                    html_row = html_row.replace("*Nombre*",json_obj[i].nombre);
                    html_row = html_row.replace("*Dni*",json_obj[i].dni);
                    html_row = html_row.replace("*ObraSocial*",json_obj[i].obra_social);
                    output+= html_row;
                }
              $(".entity-list tbody").html(output);
    });
  });

  function modificar(elm){
    resetRows(elm);
    var datos = $(elm).parents("tr").children("td").children(".dato"); //Seleccionamos los datos
    var input = $(elm).parents("tr").children("td").children("input"); //Seleccionamos los input

    input.each(function(){
      $(this).val($(this).parent("td").children(".dato").html()) //Le ponemos el valor del dato
    });
    
    input.filter(".dni").prop("disabled", true); //Deshabilitamos el campo que se usa como id
    $(elm).parents("tr").addClass("selected");
  };

  function actualizar(elm){
    $(elm).parents("tr").addClass("saving");
    var datos = $(elm).parents("tr").children("td").children(".dato"); //Seleccionamos los datos
    var input = $(elm).parents("tr").children("td").children("input"); //Seleccionamos los input
    input.each(function(){
        $(this).prop("disabled", true); //Deshabilita inputs
    });
    var nombre = $(elm).parents("tr").children("td").children("input.nombre").val();
    var dni = $(elm).parents("tr").children("td").children("input.dni").val();
    var obrasocial = $(elm).parents("tr").children("td").children("input.obrasocial").val();

    var data = { "nombre": nombre, "obrasocial": obrasocial };

    $.ajax({
      method: "PUT",
      url: base_url+"/pacientes/"+dni,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data)
    })
      .done(function( msg ) {
        $(elm).parents("tr").removeClass("saving");
        input.each(function(){
            $(this).prop("disabled", false); //Habilita inputs
        });
        datos.filter(".nombre").html(nombre);
        datos.filter(".obrasocial").html(obrasocial);
        $(elm).parents("tr").removeClass("selected");

        $.notify({
            message: 'Actualizado correctamente' 
        },{
            type: 'info',
            placement: {
                from: "top",
                align: "center"
            },
            delay: 500
        });
    });
  };

  function crear(elm){
    $(elm).parents("tr").removeClass("nuevorow");
	$(elm).parents("tr").addClass("saving");

    var datos = $(elm).parents("tr").children("td").children(".dato"); //Seleccionamos los datos
    var input = $(elm).parents("tr").children("td").children("input"); //Seleccionamos los input
    input.each(function(){
        $(this).prop("disabled", true); //Deshabilita inputs
    });
    var nombre = $(elm).parents("tr").children("td").children("input.nombre").val();
    var dni = $(elm).parents("tr").children("td").children("input.dni").val();
    var obrasocial = $(elm).parents("tr").children("td").children("input.obrasocial").val();

    var data = { "nombre": nombre, "dni": dni, "obrasocial": obrasocial };

    $.ajax({
      method: "POST",
      url: base_url+"/pacientes",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function( msg ) {
        $(elm).parents("tr").removeClass("saving");
        input.each(function(){
            $(this).prop("disabled", false); //Habilita inputs
        });
        datos.filter(".nombre").html(nombre);
        datos.filter(".dni").html(dni);
        datos.filter(".obrasocial").html(obrasocial);
        $(elm).parents("tr").removeClass("selected");

        $.notify({
            message: 'Creado correctamente' 
        },{
            type: 'info',
            placement: {
                from: "top",
                align: "center"
            },
            delay: 500
        });
    	}
    });
  };

  function eliminar(elm){
	$(elm).parents("tr").addClass("saving");
    
    var dni = $(elm).parents("tr").children("td").children("div.dni").html();

    $.ajax({
      method: "DELETE",
      url: base_url+"/pacientes/"+dni,
      dataType: "json",
      contentType: "application/json",
      success: function( msg ) {
        $(elm).parents("tr").remove();
        $.notify({
            message: 'Eliminado correctamente' 
        },{
            type: 'info',
            placement: {
                from: "top",
                align: "center"
            },
            delay: 500
        });
    	}
    });
  };

  function nuevoRow(){
    if ($("tr.nuevorow").length==0) {
    	$("tbody").children("tr").removeClass("selected");
    	var row = "<tr class=\"selected nuevorow\"><td><div class=\"dato nombre\">Nombre</div><input class=\"nombre\"></input></td><td><div class=\"dato dni\">Dni</div><input class=\"dni\"></input></td><td><div class=\"dato obrasocial\">Obra Social</div><input class=\"obrasocial\"></input></td>"+row_structure+"</tr>";
    	$(row).prependTo(".table");
    };
  };