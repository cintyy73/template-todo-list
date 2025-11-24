# 🚨 Errores Comunes en React - Soluciones Rápidas

## Para la Profesora Suplente y Estudiantes

### ❌ Error: "Objects are not valid as a React child"
```javascript
// ❌ INCORRECTO
return <div>{contacto}</div>

// ✅ CORRECTO  
return <div>{contacto.name}</div>
```

### ❌ Error: "Warning: Each child should have a unique key"
```javascript
// ❌ INCORRECTO
{contacts.map(contact => <div>{contact.name}</div>)}

// ✅ CORRECTO
{contacts.map(contact => <div key={contact.id}>{contact.name}</div>)}
```

### ❌ Error: "Cannot read properties of undefined"
```javascript
// ❌ INCORRECTO
{contacts.map(contact => <div>{contact.name}</div>)}

// ✅ CORRECTO
{contacts && contacts.map(contact => <div key={contact.id}>{contact.name}</div>)}
```

### ❌ Error: "Too many re-renders"
```javascript
// ❌ INCORRECTO
useEffect(() => {
  setContacts(newData);
}); // Sin array de dependencias

// ✅ CORRECTO
useEffect(() => {
  setContacts(newData);
}, []); // Con dependencias controladas
```

### ❌ Error: "Cannot update a component while rendering"
```javascript
// ❌ INCORRECTO
function Component() {
  setCount(count + 1); // Llamada directa en render
  return <div>{count}</div>
}

// ✅ CORRECTO
function Component() {
  const handleClick = () => setCount(count + 1); // En evento
  return <button onClick={handleClick}>{count}</button>
}
```

### ❌ Error: No se puede eliminar contactos
```javascript
// ❌ INCORRECTO - Mutación directa del estado
const handleDelete = (id) => {
  contacts.splice(contacts.findIndex(c => c.id === id), 1);
}

// ✅ CORRECTO - Inmutabilidad con filter
const handleDelete = (id) => {
  setContacts(contacts.filter(contact => contact.id !== id));
}
```

### ❌ Error: Elimina el contacto incorrecto
```javascript
// ❌ INCORRECTO - Usar índice en lugar de ID
<button onClick={() => onDelete(index)}>Eliminar</button>

// ✅ CORRECTO - Usar ID único
<button onClick={() => onDelete(contact.id)}>Eliminar</button>
```

---

## 🔧 Debugging Tips

### 1. Usar console.log para debuggear
```javascript
useEffect(() => {
  console.log('📊 Estado actual de contacts:', contacts);
}, [contacts]);
```

### 2. Verificar que el estado se actualiza
```javascript
const handleAddContact = (newContact) => {
  console.log('Antes:', contacts);
  setContacts([...contacts, newContact]);
  console.log('Nuevo contacto:', newContact);
};
```

### 3. Validar props antes de usar
```javascript
function ContactCard({ name, phone }) {
  if (!name || !phone) {
    return <div>❌ Faltan datos del contacto</div>
  }
  
  return <div>{name} - {phone}</div>
}
```

---

## 💡 Consejos para Estudiantes

### Checklist antes de preguntar:
- [ ] ¿Agregaste la prop `key` en las listas?
- [ ] ¿Verificaste que las props existen antes de usarlas?
- [ ] ¿El useState está importado correctamente?
- [ ] ¿Los nombres de los archivos y componentes coinciden?
- [ ] ¿Las rutas de importación son correctas?

### Herramientas útiles:
- **React Developer Tools** (extensión del navegador)
- **Console.log** para debuggear estado
- **Network tab** para ver llamadas localStorage
- **VS Code** con extensión ES7+ React snippets

---

## 🎯 Preparación para el TP Todo List

### Similitudes que ya practican:
✅ useState para manejar estado  
✅ useEffect para localStorage  
✅ Formularios con validaciones  
✅ Renderizado de listas  
✅ Componentes modulares  

### Para el TP cambiarán:
📝 "Contactos" → "Tareas"  
✔️ Agregar toggle completado/pendiente  
✏️ Funcionalidad de editar  
🎛️ Filtros por estado  
🎨 Styling más elaborado  

### Estructura sugerida para el TP:
```
src/
├── App.jsx
├── components/
│   ├── TodoForm.jsx     (similar a ContactForm)
│   ├── TodoList.jsx     (similar a ContactList)  
│   ├── TodoItem.jsx     (similar a ContactCard)
│   └── TodoFilters.jsx  (nuevo - para filtrar)
└── utils/
    └── localStorage.js  (opcional)
```

¡Mucho éxito! 🚀