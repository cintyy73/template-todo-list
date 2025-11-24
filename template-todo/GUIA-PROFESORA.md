# 🎯 GUÍA PASO A PASO PARA LA PROFESORA SUPLENTE

Este archivo contiene el código que debe ir mostrando gradualmente en cada ejercicio. Copiar y pegar según se avance en la clase.

---

## 📝 EJERCICIO 1: ESTRUCTURA BÁSICA
**Reemplazar todo el contenido de App.jsx con esto:**

```javascript
function App() {
  // Array hardcodeado para empezar
  const contactosIniciales = [
    { id: 1, name: "Ana García", phone: "555-0001" },
    { id: 2, name: "Carlos López", phone: "555-0002" },
    { id: 3, name: "María Rodríguez", phone: "555-0003" }
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Mi Lista de Contactos</h1>
      
      {contactosIniciales.map(contacto => (
        <div key={contacto.id} style={{ 
          border: "1px solid #ccc", 
          padding: "10px", 
          margin: "10px 0",
          borderRadius: "5px" 
        }}>
          <h3>{contacto.name}</h3>
          <p>📞 {contacto.phone}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
```

---

## 📝 EJERCICIO 2: COMPONENTES Y PROPS
**Reemplazar App.jsx con esto:**

```javascript
import ContactList from './components/ContactList.jsx';

function App() {
  const contactosIniciales = [
    { id: 1, name: "Ana García", phone: "555-0001" },
    { id: 2, name: "Carlos López", phone: "555-0002" },
    { id: 3, name: "María Rodríguez", phone: "555-0003" }
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Mi Lista de Contactos</h1>
      <ContactList contacts={contactosIniciales} />
    </div>
  );
}

export default App;
```

---

## 📝 EJERCICIO 3: ESTADO CON useState
**Reemplazar App.jsx con esto:**

```javascript
import { useState } from 'react';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';

function App() {
  // Estado para manejar la lista de contactos
  const [contacts, setContacts] = useState([
    { id: 1, name: "Ana García", phone: "555-0001" },
    { id: 2, name: "Carlos López", phone: "555-0002" },
    { id: 3, name: "María Rodríguez", phone: "555-0003" }
  ]);

  // Función para agregar contacto
  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Mi Lista de Contactos</h1>
      
      <ContactForm onAddContact={handleAddContact} />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
```

---

## 📝 EJERCICIO 4: useEffect Y localStorage
**⚠️ PATRÓN CORREGIDO - Sin warnings de React**
**Reemplazar App.jsx con esto:**

```javascript
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';

function App() {
  // ✅ MEJOR PRÁCTICA - Inicialización lazy
  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem('contactos');
      if (savedContacts) {
        return JSON.parse(savedContacts);
      } else {
        // Si no hay datos, usar datos iniciales
        return [
          { id: 1, name: "Ana García", phone: "555-0001" },
          { id: 2, name: "Carlos López", phone: "555-0002" }
        ];
      }
    } catch (error) {
      console.error('Error al cargar contactos:', error);
      return [];
    }
  });

  // Solo guardar cuando cambien los contactos
  useEffect(() => {
    try {
      localStorage.setItem('contactos', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }, [contacts]);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Mi Lista de Contactos</h1>
      
      <ContactForm onAddContact={handleAddContact} />
      <ContactList contacts={contacts} />
      
      <p style={{ color: "#666", textAlign: "center" }}>
        💾 Tus contactos se guardan automáticamente
      </p>
    </div>
  );
}

export default App;
```

---

## 📝 EJERCICIO 5: MARCAR COMO CONTACTADO (TACHAR)
**Reemplazar App.jsx con esto:**

```javascript
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';
import './styles/ContactApp.css'; // 🎨 Agregar estilos

function App() {
  // ✅ Inicialización lazy con datos que incluyen isCompleted
  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem('contactos');
      if (savedContacts) {
        return JSON.parse(savedContacts);
      } else {
        return [
          { id: 1, name: "Ana García", phone: "555-0001", isCompleted: false },
          { id: 2, name: "Carlos López", phone: "555-0002", isCompleted: true }
        ];
      }
    } catch (error) {
      console.error('Error al cargar contactos:', error);
      return [];
    }
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('contactos', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newContact) => {
    // Agregar propiedad isCompleted = false por defecto
    setContacts([...contacts, { ...newContact, isCompleted: false }]);
  };

  // ⭐ NUEVA FUNCIÓN - Marcar como contactado/no contactado
  const handleToggleComplete = (contactId) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId 
        ? { ...contact, isCompleted: !contact.isCompleted }
        : contact
    ));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Mi Lista de Contactos</h1>
      
      <ContactForm onAddContact={handleAddContact} />
      <ContactList 
        contacts={contacts} 
        onToggleComplete={handleToggleComplete}
      />
      
      <p className="text-center mt-20">
        💾 Total: {contacts.length} | Contactados: {contacts.filter(c => c.isCompleted).length}
      </p>
    </div>
  );
}

export default App;
```

---

## 📝 EJERCICIO 6: ELIMINAR CONTACTOS
**Agregar esta función al código del ejercicio 5:**

```javascript
// ⭐ NUEVA FUNCIÓN - Eliminar contacto
const handleDeleteContact = (contactId) => {
  const contactToDelete = contacts.find(c => c.id === contactId);
  const confirmed = window.confirm(
    `¿Estás seguro de eliminar a "${contactToDelete?.name}"?`
  );
  
  if (confirmed) {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    alert('✅ Contacto eliminado con éxito');
  }
};

// Actualizar el JSX para incluir la prop:
<ContactList 
  contacts={contacts} 
  onDeleteContact={handleDeleteContact}
  onToggleComplete={handleToggleComplete}
/>
```

---

## 📝 EJERCICIO BONUS: FUNCIONALIDADES AVANZADAS
**Para este ejercicio, usar el archivo `AppCompleta.jsx` como referencia que incluye:**
- Buscador en tiempo real
- Estadísticas avanzadas
- Mejor manejo de errores
- Interfaz más pulida

---

## 📚 NOTAS IMPORTANTES PARA LA PROFESORA

### ⚠️ **CAMBIO IMPORTANTE - useState Lazy Initialization**

**Problema anterior:** Usar useEffect para cargar datos iniciales causaba warnings de React.

**Solución actual:** Usar función en useState para inicialización lazy:

```javascript
// ✅ CORRECTO
const [contacts, setContacts] = useState(() => {
  const saved = localStorage.getItem('contactos');
  return saved ? JSON.parse(saved) : [];
});

// ❌ EVITAR
const [contacts, setContacts] = useState([]);
useEffect(() => {
  setContacts(JSON.parse(localStorage.getItem('contactos')));
}, []);
```

### ⏰ **Timing Sugerido:**
- **Ejercicio 1:** 20 minutos (JSX básico)
- **Ejercicio 2:** 25 minutos (Componentes y props)
- **Ejercicio 3:** 25 minutos (useState y formularios)
- **Ejercicio 4:** 25 minutos (useEffect y localStorage - ¡Explicar patrón nuevo!)
- **Ejercicio 5:** 20 minutos (Marcar como contactado)
- **Ejercicio 6:** 20 minutos (Eliminar contactos)
- **Ejercicio Bonus:** 25 minutos (Funcionalidades avanzadas)

### 🚨 **Errores Comunes a Explicar:**

1. **"Objects are not valid as a React child"**
   - Mostrar objeto en vez de propiedad
   - Solución: `{contact.name}` no `{contact}`

2. **"Warning: Each child should have a unique key"**
   - Falta key en `.map()`
   - Solución: `key={item.id}`

3. **"Cannot read properties of undefined"**
   - No validar si existe la prop/variable
   - Solución: `contacts && contacts.map()`

4. **"Too many re-renders" o "Calling setState synchronously within an effect"**
   - useEffect mal usado para datos iniciales
   - Solución: usar useState lazy initialization

### 🎯 **Puntos Clave a Enfatizar:**
- **Inmutabilidad del estado** - Nunca mutar directamente
- **Flujo unidireccional de datos** - Props van hacia abajo
- **Separación de responsabilidades** - Un componente, una responsabilidad
- **Validaciones en formularios** - Siempre validar input del usuario
- **UX y feedback al usuario** - Confirmaciones y mensajes
- **Mejores prácticas modernas** - useState lazy, useEffect solo para efectos

### 💡 **Tips de Enseñanza:**
- Mostrar los errores intencionalmente para que aprendan a debuggear
- Explicar el "por qué" detrás de cada patrón
- Hacer que escriban el código ellas mismas, no solo copiar/pegar
- Relacionar cada ejercicio con el TP final de Todo List
- Enfatizar que estos patrones son fundamentales en React moderno

¡Mucho éxito en la clase! 🚀