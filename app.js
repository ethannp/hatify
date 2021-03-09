var canvas = new fabric.Canvas('c');
var fname = "";
var hat = "santa";
var bg;
document.getElementById('file').addEventListener("change", function (e) {
    if (e.target.files) {
        var file = e.target.files[0];
        bg = file;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (f) {
            var data = f.target.result;
            fabric.Image.fromURL(data, function (img) {
                canvas.setWidth(500);
                canvas.setHeight(500 * img.height / img.width)
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: canvas.width / img.width,
                    scaleY: canvas.height / img.height
                });
            });
        }
        fabric.Image.fromURL(`static/${hat}.png`, function (img) {
            img.scaleToWidth(100);
            img.scaleToHeight(100);
            canvas.add(img);
        });
        canvas.clear().renderAll();

        let remove = document.getElementById("file").value.split("\\").pop();
        fname = remove.substr(0, remove.lastIndexOf("."));
    }
});

function download() {
    var link = document.createElement('a');
    link.download = fname + '_hatified.png';
    canvas.discardActiveObject();
    this.canvas.renderAll();
    link.href = document.getElementById('c').toDataURL()
    link.click();
}

function choose() {
    document.getElementById("drop").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function refresh(nhat) {
    hat = nhat;
    if (bg) {
        let file = bg;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (f) {
            var data = f.target.result;
            fabric.Image.fromURL(data, function (img) {
                canvas.setWidth(500);
                canvas.setHeight(500 * img.height / img.width)
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: canvas.width / img.width,
                    scaleY: canvas.height / img.height
                });
            });
        }
    }
    fabric.Image.fromURL(`static/${nhat}.png`, function (img) {
        img.scaleToWidth(100);
        img.scaleToHeight(100);
        canvas.add(img);
    });
    canvas.clear().renderAll();
}