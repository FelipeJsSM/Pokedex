$(document).ready(function () {
  $("#filterForm").on("submit", function (e) {
    e.preventDefault();
    
    let searchTerm = $("#searchInput").val().trim();
    let genreFilter = $("#genreSelect").val();
    
    $.get("/", { search: searchTerm, genreFilter: genreFilter }, function (data) {
      $("main").html($(data).find("main").html());
    });
  });
});