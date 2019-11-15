  var html_structure = "<tr>" +
                    "<td class=\"hide\"><div class=\"dato id\">*Id*</div><input class=\"id\"></input></td>"
                    +"<td><div class=\"dato nombre\">*Nombre*</div><input class=\"nombre\"></input></td>"
                    +row_structure
                    +"</tr>";

  $(document).ready(function(){
    //Traemos las Especialidades
    $.get(base_url+"/especialidades", function(data, status){
        var json_obj = data;
        var output="";
        for (var i in json_obj) 
                {
                	html_row = html_structure;
                	html_row = html_row.replace("*Id*",json_obj[i].id);
                	html_row = html_row.replace("*Nombre*",json_obj[i].nombre);
                    output+= html_row;
                }
              $(".entity-list tbody").html(output);
        });
  });

//Ocultar el ID

  function modificar(elm){
    resetRows(elm);
    var datos = $(elm).parents("tr").children("td").children(".dato"); //Seleccionamos los datos
    var input = $(elm).parents("tr").children("td").children("input"); //Seleccionamos los input

    input.each(function(){
      $(this).val($(this).parent("td").children(".dato").html()) //Le ponemos el valor del dato
    });

    //Asignamos la especialidad al select
    var especialidad = datos.filter(".especialidad").html();
    $(elm).parents("tr").children("td").children("select").children("option").each(function() {
      if($(this).html()==especialidad){
        $(this).prop('selected', true);
      }
    });
    
    input.filter(".id").prop("disabled", true); //Deshabilitamos el campo que se usa como id
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
    var id = $(elm).parents("tr").children("td").children("input.id").val();

    var data = { "nombre": nombre };

    $.ajax({
      method: "PUT",
      url: base_url+"/especialidades/"+id,
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

    var data = { "nombre": nombre };

    $.ajax({
      method: "POST",
      url: base_url+"/especialidades",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function( msg ) {
        $(elm).parents("tr").removeClass("saving");
        input.each(function(){
            $(this).prop("disabled", false); //Habilita inputs
        });
        datos.filter(".nombre").html(nombre);
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
    
    var id = $(elm).parents("tr").children("td").children("div.id").html();
    $.ajax({
      method: "DELETE",
      url: base_url+"/especialidades/"+id,
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
    	var row = "<tr class=\"selected nuevorow\"><td class=\"hide\"><div class=\"dato id\">Id</div><input class=\"id\"></input></td><td><div class=\"dato nombre\">Nombre</div><input class=\"nombre\"></input></td>"+row_structure+"</tr>";
    	$(row).prependTo(".table");
    };
  };