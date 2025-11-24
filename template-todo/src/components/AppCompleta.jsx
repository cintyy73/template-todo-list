/**
 * 🎯 EJERCICIOS 3, 4 y 5: APLICACIÓN COMPLETA CON HOOKS
 * 
 * Este archivo muestra la evolución completa de App.jsx
 * Para la clase, ir descomentando secciones gradualmente
 * 
 * EJERCICIO 3: useState básico
 * EJERCICIO 4: useEffect y localStorage  
 * EJERCICIO 5: Funcionalidades avanzadas (eliminar, tachar, buscar)
 */

import { useState, useEffect } from 'react';
import { FaAddressBook, FaSearch } from 'react-icons/fa';
import ContactForm from './ContactForm.jsx';
import ContactList from './ContactList.jsx';
import '../styles/ContactApp.css'; // 🎨 Importar estilos

function AppCompleta() {
  // 📝 EJERCICIO 3: Estado con inicialización lazy para evitar useEffect innecesario
  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem('contactos');
      if (savedContacts) {
        console.log('✅ Contactos cargados desde localStorage');
        return JSON.parse(savedContacts);
      }
    } catch (error) {
      console.error('❌ Error al cargar contactos:', error);
    }
    // Si no hay datos guardados o hay error, retornar array vacío
    return [];
  });
  
  // 📝 EJERCICIO 5: Estado para el buscador
  const [searchTerm, setSearchTerm] = useState('');

  // 🔄 EJERCICIO 4: Solo guardar en localStorage cuando cambien los contactos
  useEffect(() => {
    try {
      localStorage.setItem('contactos', JSON.stringify(contacts));
      console.log('💾 Contactos guardados en localStorage');
    } catch (error) {
      console.error('❌ Error al guardar contactos:', error);
    }
  }, [contacts]);

  // 📝 EJERCICIO 3: Función para agregar contacto
  const handleAddContact = (newContact) => {
    console.log('➕ Agregando contacto:', newContact);
    
    // Verificar que no exista un contacto con el mismo nombre
    const exists = contacts.find(contact => 
      contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    
    if (exists) {
      alert('⚠️ Ya existe un contacto con ese nombre');
      return;
    }

    // Agregar al array manteniendo inmutabilidad
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  // 📝 EJERCICIO 5: Función para eliminar contacto
  const handleDeleteContact = (contactId) => {
    // Confirmar antes de eliminar
    const contactToDelete = contacts.find(c => c.id === contactId);
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar a "${contactToDelete?.name}"?`
    );
    
    if (!confirmed) return;

    console.log('🗑️ Eliminando contacto con ID:', contactId);
    
    // Filtrar todos excepto el que queremos eliminar
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== contactId)
    );
    
    // Feedback al usuario
    alert('✅ Contacto eliminado con éxito');
  };

  // 📝 EJERCICIO NUEVO: Función para marcar como contactado/no contactado
  const handleToggleComplete = (contactId) => {
    console.log('🔄 Cambiando estado de contacto con ID:', contactId);
    
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, isCompleted: !contact.isCompleted }
          : contact
      )
    );
  };

  // 📝 EJERCICIO 5: Función para manejar búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 📝 EJERCICIO 5: Filtrar contactos según búsqueda
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

      {/* Buscador - EJERCICIO 5 */}
      <div className="search-container">
        <h3 className="search-title">
          <FaSearch /> Buscar Contactos
        </h3>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o teléfono..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Estadísticas */}
      <div className="stats-container">
        <p className="stats-text">
          📊 <strong>Total:</strong> {contacts.length} contactos | 
          <strong> Mostrando:</strong> {filteredContacts.length} | 
          <strong> Contactados:</strong> {contacts.filter(c => c.isCompleted).length}
        </p>
      </div>

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

export default AppCompleta;

/**
 * 🧠 CONCEPTOS CLAVE - HOOKS AVANZADOS:
 * 
 * 1. useEffect CON DEPENDENCIAS:
 *    - [] = solo al montar/desmontar
 *    - [variable] = cuando la variable cambie
 *    - sin array = en cada render (¡cuidado!)
 * 
 * 2. MANEJO DE ERRORES:
 *    - try/catch para localStorage
 *    - Validaciones antes de operaciones
 *    - Feedback claro al usuario
 * 
 * 3. INMUTABILIDAD:
 *    - [...prevArray, newItem] para agregar
 *    - array.filter() para eliminar
 *    - Nunca modificar estado directamente
 * 
 * 4. FILTRADO EN TIEMPO REAL:
 *    - Estado separado para búsqueda
 *    - Filtrar antes de renderizar
 *    - Usar includes() y toLowerCase() para búsqueda
 * 
 * 5. UX AVANZADA:
 *    - Confirmaciones antes de eliminar
 *    - Estadísticas en tiempo real
 *    - Feedback visual constante
 *    - Persistencia transparente
 */