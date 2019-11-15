  var html_structure = "<tr>" +
                    "<td class=\"hide\"><div class=\"dato id\">*Id*</div><input class=\"id\"></input></td>"
                    +"<td><div class=\"dato medico\">*Medico*</div>*SelectMedicos*</td>"
                    +"<td><div class=\"dato paciente\">*Paciente*</div>*SelectPacientes*</td>"
                    +"<td><div class=\"dato fecha\">*Fecha*</div><input class=\"fecha\"></input></td>"
                    +row_structure
                    +"</tr>";

  var medicos = "";
  var pacientes = "";

  $(document).ready(function(){

    //Traemos los Medicos
    medicos = "<select class=\"medico\">";
    $.get(base_url+"/medicos", function(data, status){
        for (var i in data) 
        {
          medicos += "<option value=\""+data[i].id+"\">"+data[i].nombre+"</option>";
        }
        medicos += "</select>"
        html_structure = html_structure.replace("*SelectMedicos*",medicos);

        //Cuando termina traemos los Pacientes
        pacientes = "<select class=\"paciente\">";
        $.get(base_url+"/pacientes", function(data, status){
            for (var i in data) 
            {
              pacientes += "<option value=\""+data[i].id+"\">"+data[i].nombre+"</option>";
            }
            medicos += "</select>"
            html_structure = html_structure.replace("*SelectPacientes*",pacientes);

            //Cuando termina traemos los Turnos
            $.get(base_url+"/turnos", function(data, status){
                var json_obj = data;
                var output="";
                for (var i in json_obj) 
                        {
                            html_row = html_structure;
                            html_row = html_row.replace("*Id*",json_obj[i].id);
                            html_row = html_row.replace("*Medico*",json_obj[i].medico);
                            html_row = html_row.replace("*Paciente*",json_obj[i].paciente);
                            html_row = html_row.replace("*Fecha*",json_obj[i].fecha);
                            output+= html_row;
                        }
                      $(".entity-list tbody").html(output);
            });
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
    
    //Asignamos los valores a los select
    var medico = datos.filter(".medico").html();
    $(elm).parents("tr").children("td").children("select.medico").children("option").each(function() {
      if($(this).html()==medico){
        $(this).prop('selected', true);
      }
    });
    var paciente = datos.filter(".paciente").html();
    $(elm).parents("tr").children("td").children("select.paciente").children("option").each(function() {
      if($(this).html()==paciente){
        $(this).prop('selected', true);
      }
    });

    $(elm).parents("tr").addClass("selected");
  };

  function actualizar(elm){
    $(elm).parents("tr").addClass("saving");
    var datos = $(elm).parents("tr").children("td").children(".dato"); //Seleccionamos los datos
    var input = $(elm).parents("tr").children("td").children("input"); //Seleccionamos los input
    var select = $(elm).parents("tr").children("td").children("select"); //Seleccionamos los select
    input.each(function(){
        $(this).prop("disabled", true); //Deshabilita inputs
    });
    select.each(function(){
        $(this).prop("disabled", true); //Deshabilita select
    });
    var id_medico = $(elm).parents("tr").children("td").children("select.medico").children("option:selected").val();
    var medico = $(elm).parents("tr").children("td").children("select.medico").children("option:selected").html();
    var id_paciente = $(elm).parents("tr").children("td").children("select.paciente").children("option:selected").val();
    var paciente = $(elm).parents("tr").children("td").children("select.paciente").children("option:selected").html();
    var fecha = $(elm).parents("tr").children("td").children("input.fecha").val();
    var id = $(elm).parents("tr").children("td").children("input.id").val();
    
    var data = { "medico": id_medico, "paciente": id_paciente, "fecha": fecha };

    $.ajax({
      method: "PUT",
      url: base_url+"/turnos/"+id,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data)
    })
      .done(function( msg ) {
        $(elm).parents("tr").removeClass("saving");
        input.each(function(){
            $(this).prop("disabled", false); //Habilita inputs
        });
        select.each(function(){
            $(this).prop("disabled", false); //Habilita inputs
        });
        datos.filter(".medico").html(medico);
        datos.filter(".paciente").html(paciente);
        datos.filter(".fecha").html(fecha);
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
    var select = $(elm).parents("tr").children("td").children("select"); //Seleccionamos los select
    input.each(function(){
        $(this).prop("disabled", true); //Deshabilita inputs
    });
    select.each(function(){
        $(this).prop("disabled", true); //Deshabilita select
    });
    var id_medico = $(elm).parents("tr").children("td").children("select.medico").children("option:selected").val();
    var medico = $(elm).parents("tr").children("td").children("select.medico").children("option:selected").html();
    var id_paciente = $(elm).parents("tr").children("td").children("select.paciente").children("option:selected").val();
    var paciente = $(elm).parents("tr").children("td").children("select.paciente").children("option:selected").html();
    var fecha = $(elm).parents("tr").children("td").children("input.fecha").val();

    var data = { "medico": id_medico, "paciente": id_paciente, "fecha": fecha };

    $.ajax({
      method: "POST",
      url: base_url+"/turnos",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function( msg ) {
        $(elm).parents("tr").removeClass("saving");
        input.each(function(){
            $(this).prop("disabled", false); //Habilita inputs
        });
        select.each(function(){
            $(this).prop("disabled", false); //Habilita inputs
        });
        datos.filter(".medico").html(medico);
        datos.filter(".paciente").html(paciente);
        datos.filter(".fecha").html(fecha);
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
    
    var dni = $(elm).parents("tr").children("td").children("div.id").html();

    $.ajax({
      method: "DELETE",
      url: base_url+"/turnos/"+id,
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
      var row = "<tr class=\"selected nuevorow\"><td class=\"hide\"><div class=\"dato id\">*Id*</div><input class=\"id\"></input></td><td><div class=\"dato medico\">*Medico*</div>*SelectMedicos*</td><td><div class=\"dato paciente\">*Paciente*</div>*SelectPacientes*</td><td><div class=\"dato fecha\">*Fecha*</div><input class=\"fecha\"></input></td>"+row_structure+"</tr>";
      row = row.replace("*SelectMedicos*",medicos);
      row = row.replace("*SelectPacientes*",pacientes);
    	$(row).prependTo(".table");
    };
  };