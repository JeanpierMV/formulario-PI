// Vista previa de la imagen del insumo
document.getElementById("imagen").addEventListener("change", function(event) {
    let file = event.target.files[0];
    let preview = document.getElementById("previewImg");

    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        }
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
        preview.style.display = "none";
    }
});

// Captura de datos, validación y guardado en localStorage
document.getElementById("insumoForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recarga de página

    let nombreInsumo = document.getElementById("nombreInsumo").value.trim();
    let stockMinimo = document.getElementById("stockMinimo").value.trim();
    let precioUnitario = document.getElementById("precioUnitario").value.trim();
    let categoria = document.getElementById("categoria").value;
    let descripcion = document.getElementById("descripcion").value.trim();
    let imagenInput = document.getElementById("imagen");
    let imagen = document.getElementById("previewImg").src;

    // Validar si hay una imagen seleccionada
    if (imagenInput.files.length === 0) {
        alert("Por favor, selecciona una imagen para el insumo.");
        return;
    }

    // Validar que los campos obligatorios no estén vacíos
    if (!nombreInsumo || !stockMinimo || !precioUnitario || !categoria || !descripcion) {
        alert("Por favor, completa todos los campos del formulario.");
        return;
    }

    // Recuperar array de insumos del localStorage o inicializar vacío
    let insumos = JSON.parse(localStorage.getItem("insumosDonAbe")) || [];

    // Agregar nuevo insumo al array
    insumos.push({
        nombreInsumo,
        stockMinimo,
        precioUnitario,
        categoria,
        descripcion,
        imagen
    });

    // Guardar en localStorage
    localStorage.setItem("insumosDonAbe", JSON.stringify(insumos));

    alert("¡Insumo registrado exitosamente en el inventario de Don Abe Urban Food!");
    location.reload(); // Recarga para limpiar el formulario
});