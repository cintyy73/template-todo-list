/**
 * 🎯 RESULTADO FINAL - APLICACIÓN COMPLETA
 * 
 * Esta es la versión final funcional que las alumnas desarrollarán gradualmente
 * en la clase de repaso.
 */

import { useState, useEffect } from 'react';
import { FaAddressBook } from 'react-icons/fa';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';
import './styles/ContactApp.css'; // 🎨 Importar estilos

function App() {
  // Estado para manejar la lista de contactos - usando inicialización lazy
  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem('contactos');
      if (savedContacts) {
        return JSON.parse(savedContacts);
      } else {
        // Datos iniciales si no hay nada guardado
        return [
          { id: 1, name: "Ana García", phone: "555-0001", isCompleted: false },
          { id: 2, name: "Carlos López", phone: "555-0002", isCompleted: true },
          { id: 3, name: "María Rodríguez", phone: "555-0003", isCompleted: false }
        ];
      }
    } catch (error) {
      console.error('Error al cargar contactos:', error);
      return [];
    }
  });
  
  // Estado para el buscador
  const [searchTerm, setSearchTerm] = useState('');

  // Solo guardar en localStorage cuando cambien los contactos
  useEffect(() => {
    try {
      localStorage.setItem('contactos', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error al guardar contactos:', error);
    }
  }, [contacts]);

  // Función para agregar contacto
  const handleAddContact = (newContact) => {
    // Verificar que no exista un contacto con el mismo nombre
    const exists = contacts.find(contact => 
      contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    
    if (exists) {
      alert('⚠️ Ya existe un contacto con ese nombre');
      return;
    }

    // Agregar al array manteniendo inmutabilidad
    setContacts(prevContacts => [...prevContacts, { ...newContact, isCompleted: false }]);
  };

  // Función para eliminar contacto
  const handleDeleteContact = (contactId) => {
    const contactToDelete = contacts.find(c => c.id === contactId);
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar a "${contactToDelete?.name}"?`
    );
    
    if (!confirmed) return;

    // Filtrar todos excepto el que queremos eliminar
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== contactId)
    );
    
    // Feedback al usuario
    alert('✅ Contacto eliminado con éxito');
  };

  // Función para marcar como contactado/no contactado
  const handleToggleComplete = (contactId) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, isCompleted: !contact.isCompleted }
          : contact
      )
    );
  };

  // Función para manejar búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar contactos según búsqueda
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="app-container">
      {/* Header */}
      <header className="text-center mb-20">
        <h1 className="app-title">
          <FaAddressBook /> Mi Lista de Contactos
        </h1>
        <p className="app-subtitle">
          Gestiona tus contactos de manera fácil y rápida
        </p>
      </header>

      {/* Formulario para agregar */}
      <ContactForm onAddContact={handleAddContact} />

      {/* Buscador */}
      {contacts.length > 0 && (
        <div className="search-container">
          <h3 className="search-title">
            🔍 Buscar Contactos
          </h3>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre o teléfono..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      )}

      {/* Estadísticas */}
      {contacts.length > 0 && (
        <div className="stats-container">
          <p className="stats-text">
            📊 <strong>Total:</strong> {contacts.length} contactos | 
            <strong> Mostrando:</strong> {filteredContacts.length} | 
            <strong> Contactados:</strong> {contacts.filter(c => c.isCompleted).length}
          </p>
        </div>
      )}

      {/* Lista de contactos */}
      <ContactList 
        contacts={filteredContacts} 
        onDeleteContact={handleDeleteContact}
        onToggleComplete={handleToggleComplete}
      />

      {/* Footer con info útil */}
      <footer className="app-footer">
        <p className="footer-tip">💡 <strong>Tip:</strong> Tus contactos se guardan automáticamente</p>
        <p className="footer-info">
          Datos almacenados en localStorage del navegador
        </p>
      </footer>
    </div>
  );
}

export default App;

/**
 * 🧠 CONCEPTOS CLAVE QUE REPASAMOS:
 * 
 * 1. JSX RULES:
 *    - Solo un elemento raíz (usa Fragment <> o un div)
 *    - Atributos en camelCase (className en vez de class)
 *    - Cerrar todas las etiquetas
 * 
 * 2. INTERPOLACIÓN:
 *    - Usar {} para insertar JavaScript en JSX
 *    - Ejemplo: <h3>{contacto.name}</h3>
 * 
 * 3. ARRAYS Y RENDERIZADO:
 *    - .map() para renderizar listas
 *    - Siempre incluir key única
 * 
 * 4. STYLING INLINE:
 *    - Objetos JavaScript para estilos
 *    - Propiedades en camelCase
 */
