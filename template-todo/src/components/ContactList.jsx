/**
 * 🎯 EJERCICIO 2: COMPONENTES Y MAPEO DE LISTAS
 * 
 * Conceptos que repasamos:
 * - Renderizado de listas con .map()
 * - Props drilling (pasar datos hacia abajo)
 * - Keys en listas
 * 
 * CONSIGNA:
 * 1. Recibir array de contactos como prop
 * 2. Renderizar cada contacto usando ContactCard
 * 3. Manejar caso cuando la lista está vacía
 */

import ContactCard from './ContactCard.jsx';

// 📝 EJERCICIO 2: Completa este componente
function ContactList({ contacts, onDeleteContact, onToggleComplete }) {
  
  // Manejar caso cuando no hay contactos
  if (!contacts || contacts.length === 0) {
    return (
      <div className="empty-state">
        📝 No hay contactos en tu lista
      </div>
    );
  }

  return (
    <div className="contact-list">
      {/* Contador de contactos */}
      <p className="contact-counter">
        Total de contactos: <strong>{contacts.length}</strong>
        {contacts.filter(c => c.isCompleted).length > 0 && (
          <> | Contactados: <strong>{contacts.filter(c => c.isCompleted).length}</strong></>
        )}
      </p>
      
      {/* Lista de contactos */}
      {contacts.map(contact => (
        <ContactCard 
          key={contact.id} // ⚠️ IMPORTANTE: Key única para cada elemento
          name={contact.name}
          phone={contact.phone}
          isCompleted={contact.isCompleted || false}
          onDelete={() => onDeleteContact && onDeleteContact(contact.id)}
          onToggleComplete={() => onToggleComplete && onToggleComplete(contact.id)}
        />
      ))}
    </div>
  );
}

export default ContactList;

/**
 * 🧠 CONCEPTOS CLAVE - LISTAS:
 * 
 * 1. MÉTODO .MAP():
 *    - Transforma cada elemento del array
 *    - Devuelve un nuevo array con elementos JSX
 *    - No modifica el array original
 * 
 * 2. KEY PROP:
 *    - React necesita identificar cada elemento únicamente
 *    - Ayuda a React a saber qué cambió, se agregó o se eliminó
 *    - ⚠️ NUNCA usar el índice como key si la lista puede cambiar
 * 
 * 3. RENDERIZADO CONDICIONAL:
 *    - if/else antes del return
 *    - operador ternario: condition ? <A> : <B>
 *    - operador &&: condition && <Component>
 * 
 * 4. PROPS DRILLING:
 *    - Pasar datos/funciones a través de múltiples niveles
 *    - App -> ContactList -> ContactCard
 *    - Más adelante aprenderemos Context para evitarlo
 */