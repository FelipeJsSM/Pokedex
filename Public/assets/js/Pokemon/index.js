$(document).ready(function () {
  $(".delete-pokemon").on("click", function (e) {
    e.preventDefault();
    let form = $(this).closest(".form-delete");

    $.confirm({
      title: "¿Esta seguro de eliminar al Pokemon?",
      content: "Esta accion no se puede deshacer.",
      type: "red",
      buttons: {
        cancel: {
          text: "Cancelar",
          btnClass: "btn btn-danger",
          action: function () {
            toastr.info("Accion cancelada", "Notificacion", {
              timeOut: 2000,
            });
          },
        },
        confirm: {
          text: "Eliminar",
          btnClass: "btn btn-success",
          action: function () {
            form.submit();
            toastr.success("Pokemon eliminado correctamente", "Notificacion", {
              timeOut: 2000,
            });
          },
        }
      }
    });
  });


  if (localStorage.getItem("toastrMessage")) {
    toastr.success(localStorage.getItem("toastrMessage"), "Notificacion", {
      timeOut: 3000,
    });
    localStorage.removeItem("toastrMessage");
  }

  $("#pokemonForm").on("submit", function (e) {
    let isValid = true;
    let errorMessage = "Todos los campos son obligatorios:\n";
 
    let name = $("#pokemonName").val().trim();
    let imageURL = $("#imageUrl").val().trim();
    let region = $("#regionId").val();
    let type = $("#tipoId").val();
 
    if (!name) {
      isValid = false;
      errorMessage += "- Nombre del pokemon\n";
    }
    if (!imageURL) {
      isValid = false;
      errorMessage += "- Imagen del pokemon\n";
    }
    if (!region || region === "Selecciona una opcion") {
      isValid = false;
      errorMessage += "- Region\n";
    }
    if (!type || type === "Selecciona una opcion") {
      isValid = false;
      errorMessage += "- Tipo\n";
    }
 
    if (!isValid) {
      e.preventDefault();
      toastr.error(errorMessage, "Error", { timeOut: 3000 });
    } else {
      localStorage.setItem("toastrMessage", "Pokemon guardado correctamente");
    }
 });
});