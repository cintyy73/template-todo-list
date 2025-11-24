# 🎯 Clase de Repaso React - Lista de Contactos

## 📋 Objetivo de la Clase
Repasar conceptos fundamentales de React creando una **Lista de Contactos** que prepare a las estudiantes para el TP final de Todo List.

## 🏁 Instrucciones de Inicio
```bash
npm install
# O si prefieres yarn:
yarn install

# Iniciar servidor de desarrollo
npm run dev
# O con yarn:
yarn dev
```

## 🎨 Estilos CSS Incluidos
Se incluye un archivo `src/styles/ContactApp.css` con estilos profesionales que las alumnas pueden usar directamente:

- ✅ **Clases CSS listas para usar**
- ✅ **Diseño responsive** 
- ✅ **Iconos con react-icons**
- ✅ **Animaciones suaves**
- ✅ **Estados visuales** (hover, focus, completed)

**Para usar los estilos:** `import './styles/ContactApp.css'`

---

## 🎓 Ejercicios Graduales (2 horas aprox.)

### 📝 **Ejercicio 1: Estructura Básica y JSX** (20 min)
**Conceptos:** JSX, componentes funcionales, estructura

**Consigna:** Crear la estructura visual de una lista de contactos
- Título de la aplicación "Mi Lista de Contactos"
- Lista hardcodeada de 3 contactos con nombre y teléfono
- Cada contacto debe mostrarse en una tarjeta simple

**💡 Pista:** Usa JSX para estructurar y arrays hardcodeados para los datos

**📋 Código para ejercicio 1:**
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
```

---

### 📝 **Ejercicio 2: Componentes y Props** (25 min)
**Conceptos:** Props, componentes reutilizables, map()

**Consigna:** Modularizar la aplicación
- Crear componente `ContactCard` que reciba props (name, phone)
- Crear componente `ContactList` que renderice múltiples contactos
- Pasar datos como props desde App
- Usar `.map()` para renderizar la lista

**⚠️ Recordar:** Cada elemento de la lista necesita una `key` única

**📋 Código para ejercicio 2:**
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
```

---

### 📝 **Ejercicio 3: Estado con useState** (25 min)
**Conceptos:** useState, inmutabilidad, eventos

**Consigna:** Hacer la aplicación interactiva
- Mover los contactos hardcodeados a un estado
- Crear formulario para agregar nuevos contactos (nombre y teléfono)
- Implementar función para agregar contactos
- **Validación:** No permitir campos vacíos

**💡 Pista:** Usa `useState` para el estado de contactos y para controlar los inputs

**📋 Código para ejercicio 3:**
```javascript
import { useState } from 'react';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';

function App() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Ana García", phone: "555-0001" },
    { id: 2, name: "Carlos López", phone: "555-0002" },
    { id: 3, name: "María Rodríguez", phone: "555-0003" }
  ]);

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
```

---

### 📝 **Ejercicio 4: useEffect y localStorage** (25 min)
**Conceptos:** useEffect, localStorage, ciclo de vida

**Consigna:** Persistir datos
- Guardar contactos en localStorage cuando cambie el estado
- Cargar contactos desde localStorage al iniciar la app
- Usar `useEffect` para ambas acciones

**⚠️ Importante:** Manejar casos cuando localStorage esté vacío

**📋 Código para ejercicio 4:**
```javascript
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';

function App() {
  const [contacts, setContacts] = useState([]);

  // Cargar datos al iniciar
  useEffect(() => {
    const savedContacts = localStorage.getItem('contactos');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      const initialContacts = [
        { id: 1, name: "Ana García", phone: "555-0001" },
        { id: 2, name: "Carlos López", phone: "555-0002" }
      ];
      setContacts(initialContacts);
    }
  }, []);

  // Guardar cuando cambien los contactos
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contactos', JSON.stringify(contacts));
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
```

---

### 📝 **Ejercicio 5: Marcar como Contactado** (20 min)
**Conceptos:** Actualización de estado, inmutabilidad, renderizado condicional

**Consigna:** Agregar funcionalidad para tachar contactos
- Conectar botón de toggle en cada ContactCard
- Implementar función que cambie el estado `isCompleted`
- Aplicar estilos condicionales (tachado, colores)
- Agregar iconos con react-icons

**💡 Pista:** Usar `map()` para actualizar solo el contacto específico

**📋 Código para ejercicio 5:**
```javascript
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';
import './styles/ContactApp.css'; // 🎨 Agregar estilos

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contactos');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      const initialContacts = [
        { id: 1, name: "Ana García", phone: "555-0001", isCompleted: false },
        { id: 2, name: "Carlos López", phone: "555-0002", isCompleted: true }
      ];
      setContacts(initialContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contactos', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleAddContact = (newContact) => {
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
```

---

### 📝 **Ejercicio 6: Eliminar Contactos** (20 min)
**Conceptos:** Filtrado de arrays, confirmaciones, inmutabilidad

**Consigna:** Agregar funcionalidad de eliminar
- Conectar botón eliminar de cada ContactCard
- Implementar función que filtre el contacto eliminado
- **Validación:** Confirmar antes de eliminar
- Mostrar feedback al usuario

**💡 Pista:** Usar `array.filter()` y `window.confirm()`

**📋 Código para ejercicio 6:**
```javascript
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

// En el return, agregar la prop:
<ContactList 
  contacts={contacts} 
  onDeleteContact={handleDeleteContact}
  onToggleComplete={handleToggleComplete}
/>
```

---

### 📝 **Ejercicio Bonus: Funcionalidades Avanzadas** (25 min)
**Conceptos:** Filtrado en tiempo real, estadísticas

**Consigna:** Completar la aplicación
- Implementar buscador que filtre por nombre o teléfono
- Mostrar contador de contactos
- Mostrar mensaje cuando no hay resultados
- Mejorar la interfaz visual

---

## 🧠 Conceptos Teóricos Clave

### 🔧 **useState Hook**
```javascript
// ✅ Correcto - Inmutabilidad
const [contacts, setContacts] = useState([]);
setContacts([...contacts, newContact]);

// ❌ Incorrecto - Mutación directa
contacts.push(newContact);
```

### 🔄 **useEffect Hook**
```javascript
// ✅ MEJOR PRÁCTICA - Inicialización lazy para datos de localStorage
const [contacts, setContacts] = useState(() => {
  try {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  } catch (error) {
    console.error('Error loading contacts:', error);
    return [];
  }
});

// Solo guardar cuando cambien los contactos
useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts]);

// ❌ EVITAR - Llamar setState en useEffect para cargar datos iniciales
// useEffect(() => {
//   setContacts(JSON.parse(localStorage.getItem('contacts')));
// }, []); // Esto puede causar renders innecesarios
```

### ✅ **Marcar como Contactado**
```javascript
const handleToggleComplete = (contactId) => {
  // Actualizar solo el contacto específico
  setContacts(contacts.map(contact => 
    contact.id === contactId 
      ? { ...contact, isCompleted: !contact.isCompleted }
      : contact
  ));
};

// En JSX - estilos condicionales
<div className={`contact-card ${isCompleted ? 'completed' : ''}`}>
  <h3 className={isCompleted ? 'completed' : ''}>{name}</h3>
</div>
```

### 📱 **React Icons**
```javascript
// Importar iconos específicos
import { FaPhone, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

// Usar en JSX
<FaPhone /> {phone}
<button><FaTrash /> Eliminar</button>
```

### 🗑️ **Eliminar Contactos**
```javascript
const handleDeleteContact = (contactId) => {
  // 1. Confirmar antes de eliminar
  const confirmed = window.confirm('¿Seguro que quieres eliminar?');
  if (!confirmed) return;

  // 2. Filtrar todos excepto el que queremos eliminar
  setContacts(contacts.filter(contact => contact.id !== contactId));
  
  // 3. Feedback al usuario
  alert('✅ Contacto eliminado');
};
```

### 🎯 **Props y Flujo de Datos**
```javascript
// Componente padre pasa datos al hijo
<ContactCard name={contact.name} phone={contact.phone} />

// Componente hijo recibe props
function ContactCard({ name, phone }) {
  return <div>{name} - {phone}</div>;
}
```

### 📝 **Manejo de Formularios**
```javascript
const [formData, setFormData] = useState({ name: '', phone: '' });

const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```

---

## 🚨 Errores Comunes y Soluciones

### ❌ **Error: Missing key prop**
```javascript
// Problema
{contacts.map(contact => <ContactCard />)}

// Solución
{contacts.map(contact => <ContactCard key={contact.id} />)}
```

### ❌ **Error: Cannot read properties of undefined**
```javascript
// Problema - no validar si hay datos
localStorage.getItem('contacts').length

// Solución - validar antes de usar
const saved = localStorage.getItem('contacts');
if (saved && saved.length > 0) { ... }
```

### ❌ **Error: Component re-renders infinitely**
```javascript
// Problema - useEffect sin dependencias controladas
useEffect(() => {
  setContacts(newData);
});

// Solución - especificar dependencias
useEffect(() => {
  setContacts(newData);
}, [dependencia]);
```

---

## 🎯 Preparación para el TP Todo List

### Similitudes que practicamos:
- ✅ Gestión de estado con useState
- ✅ Persistencia con localStorage  
- ✅ Formularios controlados con validaciones
- ✅ Renderizado de listas dinámicas
- ✅ useEffect para ciclo de vida
- ✅ Modularización en componentes
- ✅ Props y flujo de datos

### Lo que aplicarán en el TP:
- 📝 Reemplazar "contactos" por "tareas"
- ✏️ Agregar funcionalidad de editar
- ✔️ Agregar toggle de completado
- 🎛️ Filtros por estado (todas/completadas/pendientes)
- 🎨 Estilos más elaborados
- 📱 Responsive design

---

## 🔧 Estructura Final Esperada
```
src/
├── App.jsx
├── components/
│   ├── ContactList.jsx
│   ├── ContactCard.jsx
│   ├── ContactForm.jsx
│   └── SearchBar.jsx (opcional)
├── styles/
│   └── ContactApp.css
└── utils/
    └── localStorage.js (opcional)
```

---

## 💪 Desafíos Opcionales
- Editar contactos existentes
- Validar formato de teléfono
- Ordenar contactos alfabéticamente
- Agregar más campos (email, dirección)

---

## 📚 Notas para la Profesora Suplente

### ⏰ Timing Sugerido:
- **Ejercicio 1:** 20 minutos (JSX básico)
- **Ejercicio 2:** 25 minutos (Componentes y props)
- **Ejercicio 3:** 25 minutos (useState y formularios)
- **Ejercicio 4:** 25 minutos (useEffect y localStorage)
- **Ejercicio 5:** 20 minutos (Marcar como contactado)
- **Ejercicio 6:** 20 minutos (Eliminar contactos)
- **Ejercicio Bonus:** 25 minutos (Funcionalidades avanzadas)

### 🚨 Errores Comunes a Explicar:

1. **"Objects are not valid as a React child"**
   - Mostrar objeto en vez de propiedad
   - Solución: `{contact.name}` no `{contact}`

2. **"Warning: Each child should have a unique key"**
   - Falta key en `.map()`
   - Solución: `key={item.id}`

3. **"Cannot read properties of undefined"**
   - No validar si existe la prop/variable
   - Solución: `contacts && contacts.map()`

4. **"Too many re-renders"**
   - useEffect sin dependencias o incorrectas
   - Solución: revisar array de dependencias

### 🎯 Puntos Clave a Enfatizar:
- Inmutabilidad del estado
- Flujo unidireccional de datos
- Separación de responsabilidades
- Validaciones en formularios
- UX y feedback al usuario

¡Mucho éxito en la clase! 🚀
