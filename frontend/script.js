// Ajustar la interfaz según el rol del usuario
function ajustarInterfazPorRol(rol) {
  if (rol === 'Cocina') {
    document.querySelectorAll('.btn-eliminar').forEach(btn => btn.style.display = 'none');
    document.getElementById('crearPedidoForm').style.display = 'none'; // Ocultar formulario de creación
  } else if (rol === 'Cliente') {
    document.getElementById('listaPedidos').style.display = 'none'; // Ocultar lista de pedidos
  }
}

// Crear un nuevo pedido (solo Cliente)
document.getElementById('crearPedidoForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id_usuario = document.getElementById('id_usuario').value;
  const estado = document.getElementById('estado').value;

  try {
    const response = await fetch('http://localhost:4000/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_usuario, estado }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.error || 'Error al crear pedido');
      return;
    }

    alert('Pedido creado exitosamente');
    fetchPedidos();
  } catch (err) {
    console.error('Error al crear pedido:', err);
    alert('Error al conectar con el servidor.');
  }
});

// Obtener todos los pedidos (Cocina y Administrador)
async function fetchPedidos() {
  try {
    const response = await fetch('http://localhost:4000/pedidos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.error || 'Error al obtener pedidos');
      return;
    }

    const pedidos = await response.json();
    const pedidosList = document.getElementById('pedidosList');
    pedidosList.innerHTML = '';

    pedidos.forEach(pedido => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${pedido.id_pedido}</td>
        <td>${pedido.id_usuario}</td>
        <td>
          <input type="text" value="${pedido.estado}" id="estado_${pedido.id_pedido}">
        </td>
        <td>
          <button class="btn-modificar" onclick="modificarPedido(${pedido.id_pedido})">Modificar</button>
          <button class="btn-eliminar" onclick="eliminarPedido(${pedido.id_pedido})">Eliminar</button>
        </td>
      `;
      pedidosList.appendChild(row);
    });
  } catch (err) {
    console.error('Error al obtener pedidos:', err);
    alert('Error al conectar con el servidor.');
  }
}

// Modificar un pedido (Cocina y Administrador)
async function modificarPedido(id) {
  const estado = document.getElementById(`estado_${id}`).value;

  try {
    const response = await fetch(`http://localhost:4000/pedidos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.error || 'Error al modificar pedido');
      return;
    }

    alert('Pedido modificado exitosamente');
    fetchPedidos();
  } catch (err) {
    console.error('Error al modificar pedido:', err);
    alert('Error al conectar con el servidor.');
  }
}

// Eliminar un pedido (solo Administrador)
async function eliminarPedido(id) {
  try {
    const response = await fetch(`http://localhost:4000/pedidos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.error || 'Error al eliminar pedido');
      return;
    }

    alert('Pedido eliminado exitosamente');
    fetchPedidos();
  } catch (err) {
    console.error('Error al eliminar pedido:', err);
    alert('Error al conectar con el servidor.');
  }
}

// Simular el rol del usuario (cambiar según el caso)
const rolUsuario = 'Cocina'; // Puede ser 'Administrador', 'Cocina', 'Cliente'
ajustarInterfazPorRol(rolUsuario);

// Cargar pedidos al inicio
fetchPedidos();
