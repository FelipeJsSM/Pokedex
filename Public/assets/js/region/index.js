$(document).ready(function () {
    $(".delete-region").on("click", function (e) {
      e.preventDefault();
      let form = $(this).closest(".form-delete");
  
      $.confirm({
        title: "¿Esta seguro de eliminar la region?",
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
              toastr.success("Region eliminada correctamente", "Notificacion", {
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
  
    $("#regionForm").on("submit", function (e) {
      let isValid = true;
      let errorMessage = "Todos los campos son obligatorios:\n";
  
      let name = $("#Name").val().trim();
  
      if (!name) {
        isValid = false;
        errorMessage += "- Nombre\n";
      }
  
      if (!isValid) {
        e.preventDefault();
        toastr.error(errorMessage, "Error", { timeOut: 3000 });
      } else {
        localStorage.setItem("toastrMessage", "Region guardada correctamente");
      }
    });
  });