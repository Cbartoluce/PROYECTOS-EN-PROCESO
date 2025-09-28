function calcularTodo() {
    // --- 1. Obtener valores de entrada ---
    const precioLista = parseFloat(document.getElementById('precioLista').value);
    const descuentoPorcentaje = parseFloat(document.getElementById('descuento').value);
    const margenUtilidadPorcentaje = parseFloat(document.getElementById('margenUtilidad').value);

    // Validación básica
    if (isNaN(precioLista) || precioLista < 0 || isNaN(descuentoPorcentaje) || isNaN(margenUtilidadPorcentaje)) {
        document.querySelector('#resultadoCostoCliente .result-value').textContent = "$0.00"; 
        document.querySelector('#resultadoPrecioVenta .result-value').textContent = "$0.00";
        return;
    }

    const tasaDescuento = descuentoPorcentaje / 100;
    const margenUtilidad = margenUtilidadPorcentaje / 100;

    // --- 2. Cálculo del Costo para el Cliente (C_cliente) ---
    // Costo Cliente = Precio de Lista * (1 - Tasa de Descuento)
    let costoCliente = precioLista * (1 - tasaDescuento);

    // --- 3. Cálculo del Precio de Venta del Cliente (PV_cliente) ---
    // FÓRMULA CORREGIDA: Se aplica el Margen de Utilidad sobre el COSTO del cliente.
    // PV_cliente = Costo Cliente * (1 + Margen de Utilidad)
    let precioVentaCliente = costoCliente * (1 + margenUtilidad);
    
    // El margen de utilidad ahora puede ser > 100% sin causar errores, pero limitamos por lógica de negocio.
    if (margenUtilidadPorcentaje < 0) {
        alert("El margen de utilidad no puede ser negativo.");
        return;
    }

    // --- 4. Mostrar Resultados ---
    const formatoMoneda = (numero) => {
        // Formato para Pesos Argentinos (ARS)
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(numero);
    };

    // Mostrar Costo para el Cliente
    document.querySelector('#resultadoCostoCliente .result-value').textContent = formatoMoneda(costoCliente);

    // Mostrar Precio de Venta Sugerido
    document.querySelector('#resultadoPrecioVenta .result-value').textContent = formatoMoneda(precioVentaCliente);

    document.getElementById('resultadoPrecioVenta').scrollIntoView({ behavior: 'smooth', block: 'end' });
}

window.onload = calcularTodo;