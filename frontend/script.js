// Lógica común
async function logout() {
    localStorage.clear();
    window.location.href = '/login.html';
  }
  
  // Cargar datos en cliente, cocina, o finanzas (dependerá del archivo específico).
  // Por ejemplo, cargar productos en cliente.html o pedidos en cocina.html.
  