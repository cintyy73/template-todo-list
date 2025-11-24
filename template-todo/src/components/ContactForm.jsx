/**
 * 🎯 EJERCICIO 3: FORMULARIOS Y ESTADO CON useState
 * 
 * Conceptos que repasamos:
 * - useState para manejar estado del formulario
 * - Controlled components (inputs controlados)
 * - Manejo de eventos (onChange, onSubmit)
 * - Validaciones básicas
 * 
 * CONSIGNA:
 * 1. Formulario con inputs de nombre y teléfono
 * 2. Validar que los campos no estén vacíos
 * 3. Mostrar mensajes de error
 * 4. Limpiar formulario después de agregar
 */

import { useState } from 'react';
import { FaUser, FaPhone, FaPlus, FaExclamationTriangle } from 'react-icons/fa';

function ContactForm({ onAddContact }) {
  // 📝 EJERCICIO 3: Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  // Estado para manejar errores
  const [errors, setErrors] = useState({});

  // 📝 Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Actualizar el estado del formulario
    setFormData({
      ...formData,  // Mantener los valores anteriores
      [name]: value // Actualizar solo el campo que cambió
    });

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // 📝 Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'El teléfono debe tener al menos 8 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // 📝 Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que se recargue la página

    // Validar antes de enviar
    if (!validateForm()) {
      return; // Si hay errores, no continuar
    }

    // Crear objeto contacto con ID único
    const newContact = {
      id: Date.now(), // ID basado en timestamp (simple para el ejercicio)
      name: formData.name.trim(),
      phone: formData.phone.trim()
    };

    // Llamar función del componente padre
    onAddContact(newContact);

    // Limpiar formulario
    setFormData({ name: '', phone: '' });
    setErrors({});
    
    // Mostrar mensaje de éxito (opcional)
    alert('✅ Contacto agregado con éxito!');
  };

  return (
    <div className="contact-form">
      <h2 className="form-title">
        <FaPlus /> Agregar Nuevo Contacto
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Input para nombre */}
        <div className="form-group">
          <label className="form-label">
            <FaUser /> Nombre:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ej: Ana García"
            className={`form-input ${errors.name ? 'error' : ''}`}
          />
          {/* Mostrar error si existe */}
          {errors.name && (
            <span className="form-error">
              <FaExclamationTriangle /> {errors.name}
            </span>
          )}
        </div>

        {/* Input para teléfono */}
        <div className="form-group">
          <label className="form-label">
            <FaPhone /> Teléfono:
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Ej: 555-0123"
            className={`form-input ${errors.phone ? 'error' : ''}`}
          />
          {/* Mostrar error si existe */}
          {errors.phone && (
            <span className="form-error">
              <FaExclamationTriangle /> {errors.phone}
            </span>
          )}
        </div>

        {/* Botón submit */}
        <button type="submit" className="form-submit">
          <FaPlus /> Agregar Contacto
        </button>
      </form>
    </div>
  );
}

export default ContactForm;

/**
 * 🧠 CONCEPTOS CLAVE - FORMULARIOS:
 * 
 * 1. CONTROLLED COMPONENTS:
 *    - El valor del input viene del estado de React
 *    - Cada cambio actualiza el estado
 *    - React controla completamente el input
 * 
 * 2. MANEJO DE ESTADO COMPLEJO:
 *    - Usar objeto para múltiples campos
 *    - Spread operator (...) para inmutabilidad
 *    - [name]: value para campos dinámicos
 * 
 * 3. VALIDACIONES:
 *    - Validar antes de enviar (onSubmit)
 *    - Mostrar errores específicos por campo
 *    - Limpiar errores cuando user empiece a escribir
 * 
 * 4. EVENTOS:
 *    - e.preventDefault() para evitar recarga
 *    - e.target.name y e.target.value para obtener datos
 *    - Usar name attribute para identificar campos
 * 
 * 5. UX MEJORADA:
 *    - Feedback visual con colores
 *    - Placeholder text descriptivo
 *    - Mensajes de error claros
 */