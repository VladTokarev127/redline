$(function() {

	const heroSwiper = new Swiper('.hero__swiper', {
		slidesPerView: 1
	});

	const reviewsSwiper = new Swiper('.reviews__swiper', {
		freeMode: true
	});

	$('.header__btn').click(function(e) {
		e.preventDefault();
		$('body').toggleClass('is-fixed');
		$('.header__main').fadeToggle(300);
	});

	var url = "URL HERE";
	var fileNamePrefix = "uploads/" + Date.now() + "_";

	var result = $("#file_input").withDropZone("#drop_zone", {
  url: url,   // common page for every 
  uploadBegin: function(filename, fileIndex, blob) {
    console.log("begin: " + filename)
  },
  uploadEnd: function(filename, fileIndex, blob) {
    console.log("end: " + filename)
  },
  done: function(filenames){
    console.log("done: " + filenames);
    var result = $("#result_images");
    var html = [`<b>Your image${filenames.length === 1 ? '' : 's:'}</b>`];
    for (var i = 0; i < filenames.length; i++) {
      var href = url + fileNamePrefix + filenames[i];
      html.push(`<a href="${href}">${url + fileNamePrefix}<b>${filenames[i]}</b></a>`)
    }
    result.html(html.join("<br/>"));
  },
  action: function(fileIndex){
    // you can change your file
    // for example:
    var convertTo;
    var extension;
    if (this.files[fileIndex].type === "image/png") {
      convertTo = {
        mimeType: "image/jpeg",
        maxWidth: 150,
        maxHeight: 150,
      };
      extension = ".jpg";
    }
    else {
      convertTo = null;
      extension = null;
    }

    return {
      name: "image",
      rename: function(filenameWithoutExt, ext, fileIndex) {
        return filenameWithoutExt + (extension || ext)
      },
      params: {
        preview: true,
        convertTo: convertTo,
      }
    }
  },
  ifWrongFile: "show",
  wrapperForInvalidFile: function(fileIndex) {
    return `<div style="margin: 20px 0; color: red;">File: "${this.files[fileIndex].name}" doesn't support</div>`
  },

  multiUploading: true,
  formData: function(fileIndex, blob, filename) {
    var formData = new FormData;
    formData.set("key", fileNamePrefix + filename);  // key will be file name in S3
    formData.set("file", blob, filename);
    return formData
  },

  ajaxSettings: function(settings, index, filename, blob){
    settings.error = function(e) {
      return alert(`${e.status}: ${e.statusText}`);
    }
  }
	});

	$("#upload_images").click(result.upload);

});
