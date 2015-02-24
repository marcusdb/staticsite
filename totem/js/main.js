var blockPress = false;

function submit(value) {
  var anvisaNumber, serialNumber;
  blockPress = true;
  $("#enterDataMatrix").val('');
  value = dataMatrix.parseDataMatrix(value);
  anvisaNumber = value["713"];
  serialNumber = value["21"];
  $.ajax({
    type: "GET",
    url: "https://dashboard.rastreabilidadebrasil.com.br/rest/1/report/medical_item/public/anvisa/" +
      anvisaNumber + "/serial/" + serialNumber,
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    success: function (data) {
      var idToShow = 3,
        ium = '',
        formattedDate = '',
        month; //Error
      if (+data.status !== 0) {
        idToShow = 2;
      }
      if (data && data.trackableItem) {
        formattedDate = new Date(data.trackableItem.expirationDate);
        month = formattedDate.getMonth() + 1;
        formattedDate = (month < 10 ? '0' + month : month) + (formattedDate.getFullYear() - 2000);
        ium = data.trackableItem.anvisaNumber + data.trackableItem.serialNumber + formattedDate + data.trackableItem.batchCode;
      }
      $(".et" + idToShow + " .text span").html(ium || '');
      $(".et1").animate({
        opacity: 0.0
      }, 500, function () {
        showEt(idToShow);
      });

    },
    error: function (error) {
      if (+error.status === 404) {
        $(".et1").animate({
          opacity: 0.0
        }, 500, function () {
          showEt(4);
        });
      }
    }
  });

}

function checkValidade(e) {
  var keyCode = e.keyCode || e.which;
  e = e || window.event;
  if (keyCode === dataMatrix.DEFAULT_ASCII_SEPARATOR_CODE) {
    var newVal = $("#enterDataMatrix").val() + dataMatrix.DEFAULT_COMMON_SEPARATOR;
    $("#enterDataMatrix").val(newVal);
  } else {
    if (keyCode === 13) {
      submit($("#enterDataMatrix").val());
    }
  }
}

function showEt(id) {
  $(".et" + id).css("display", "block");
  $(".et" + id).css("opacity", 0);
  $(".et" + id).animate({
    opacity: 1.0
  }, 500, function () {
    setTimeout(function () {
      $(".et" + id).animate({
        opacity: 0.0
      }, 500, function () {
        blockPress = false;
        $(".et" + id).css("display", "none");
        $("textarea[maxlength]").val("");
        $("textarea[maxlength]").focus();
        $(".et1").animate({
          opacity: 1.0
        }, 500);
      });
    }, 10000);
  });
}

$(document).ready(function () {
  $("textarea[maxlength]").focus();
});
