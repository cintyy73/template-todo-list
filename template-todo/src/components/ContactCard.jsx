/**
 * 🎯 EJERCICIO 2: PROPS Y COMPONENTES REUTILIZABLES
 * 
 * Conceptos que repasamos:
 * - Props: datos que se pasan de componente padre a hijo
 * - Destructuring de props
 * - Componentes reutilizables
 * - Iconos con react-icons
 * 
 * CONSIGNA:
 * 1. Este componente debe recibir props: name, phone, onDelete, onToggleComplete, isCompleted
 * 2. Mostrar la información del contacto
 * 3. Incluir botón eliminar y botón para marcar como contactado
 * 4. Aplicar estilos condicionales según el estado
 */

import { FaPhone, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

// 📝 EJERCICIO 2: Completa este componente
function ContactCard({ name, phone, onDelete, onToggleComplete, isCompleted = false }) {
  return (
    <div className={`contact-card ${isCompleted ? 'completed' : ''}`}>
      {/* Badge de estado */}
      <div className={`status-badge ${isCompleted ? 'inactive' : 'active'}`}>
        {isCompleted ? 'Contactado' : 'Pendiente'}
      </div>
      
      {/* Nombre del contacto */}
      <h3 className={`contact-name ${isCompleted ? 'completed' : ''}`}>
        {name}
      </h3>
      
      {/* Teléfono */}
      <p className={`contact-phone ${isCompleted ? 'completed' : ''}`}>
        <FaPhone /> {phone}
      </p>
      
      {/* Botones de acción */}
      <div className="contact-actions">
        {/* Botón marcar como contactado/pendiente */}
        <button 
          onClick={() => onToggleComplete && onToggleComplete()}
          className={`btn ${
            isCompleted ? 'btn-incomplete' : 'btn-complete'
          }`}
          title={isCompleted ? 'Marcar como pendiente' : 'Marcar como contactado'}
        >
          {isCompleted ? (
            <>
              <FaTimes /> No contactado
            </>
          ) : (
            <>
              <FaCheck /> Contactado
            </>
          )}
        </button>
        
        {/* Botón eliminar */}
        <button 
          onClick={() => onDelete && onDelete()}
          className="btn btn-delete"
          title="Eliminar contacto"
        >
          <FaTrash /> Eliminar
        </button>
      </div>
    </div>
  );
}

export default ContactCard;

/**
 * 🧠 CONCEPTOS CLAVE - PROPS:
 * 
 * 1. QUÉ SON LAS PROPS:
 *    - Datos que fluyen de padre a hijo
 *    - Son de solo lectura (immutable)
 *    - Se pasan como atributos en JSX
 * 
 * 2. DESTRUCTURING:
 *    - function ContactCard({ name, phone }) en vez de (props)
 *    - Más limpio y fácil de leer
 *    - Puedes ver qué props necesita el componente
 * 
 * 3. FUNCIONES COMO PROPS:
 *    - onDelete es una función que se pasa como prop
 *    - Permite comunicación de hijo a padre
 *    - Siempre validar si existe antes de llamarla
 * 
 * 4. ESTILOS CONDICIONALES:
 *    - Puedes usar props para cambiar estilos
 *    - Ejemplo: backgroundColor: completed ? "#green" : "#white"
 */