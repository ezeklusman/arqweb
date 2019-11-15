  var html_structure = "<tr>" +
                    "<td><div class=\"dato nombre\">*Nombre*</div><input class=\"nombre\"></input></td>"
                    +"<td><div class=\"dato legajo\">*Legajo*</div><input class=\"legajo\"></input></td>"
                    +"<td><div class=\"dato especialidad\">*Especialidad*</div>*SelectEspecialidad*</td>"
                    +row_structure
                    +"</tr>";

var especialidades = "";

  $(document).ready(function(){
    //Traemos las Especialidades
    especialidades = "<select>";
    $.get(base_url+"/especialidades", function(data, status){
        for (var i in data) 
        {
          especialidades += "<option value=\""+data[i].id+"\">"+data[i].nombre+"</option>";
        }
        especialidades += "</select>"
        html_structure = html_structure.replace("*SelectEspecialidad*",especialidades);

        //Cuando termina traemos los Médicos
        $.get(base_url+"/medicos", function(data, status){
            var json_obj = data;
            var output="";
            for (var i in json_obj) 
                    {
                        html_row = html_structure;
                        html_row = html_row.replace("*Nombre*",json_obj[i].nombre);
                        html_row = html_row.replace("*Legajo*",json_obj[i].legajo);
                        html_row = html_row.replace("*Especialidad*",json_obj[i].especialidad);
                        output+= html_row;
                    }
                  $(".entity-list tbody").html(output);
        });
    });
  });

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
    
    input.filter(".legajo").prop("disabled", true); //Deshabilitamos el campo que se usa como id
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
    var legajo = $(elm).parents("tr").children("td").children("input.legajo").val();
    var especialidad = $(elm).parents("tr").children("td").children("select").children("option:selected").html();

    var data = { "nombre": nombre, "especialidad": especialidad };

    $.ajax({
      method: "PUT",
      url: base_url+"/medicos/"+legajo,
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
        datos.filter(".especialidad").html(especialidad);
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
    var legajo = $(elm).parents("tr").children("td").children("input.legajo").val();
    var especialidad = $(elm).parents("tr").children("td").children("select").children("option:selected").html();

    var data = { "nombre": nombre, "legajo": legajo, "especialidad": especialidad };

    $.ajax({
      method: "POST",
      url: base_url+"/medicos",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function( msg ) {
        $(elm).parents("tr").removeClass("saving");
        input.each(function(){
            $(this).prop("disabled", false); //Habilita inputs
        });
        datos.filter(".nombre").html(nombre);
        datos.filter(".legajo").html(legajo);
        datos.filter(".especialidad").html(especialidad);
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
    
    var legajo = $(elm).parents("tr").children("td").children("div.legajo").html();

    $.ajax({
      method: "DELETE",
      url: base_url+"/medicos/"+legajo,
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
    	var row = "<tr class=\"selected nuevorow\"><td><div class=\"dato nombre\">Nombre</div><input class=\"nombre\"></input></td><td><div class=\"dato legajo\">Legajo</div><input class=\"legajo\"></input></td><td><div class=\"dato especialidad\">*Especialidad*</div>*SelectEspecialidad*</td>"+row_structure+"</tr>";
        row = row.replace("*SelectEspecialidad*",especialidades);
    	$(row).prependTo(".table");
    };
  };