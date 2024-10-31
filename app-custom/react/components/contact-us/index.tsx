import React, { useState } from 'react';
import { useCssHandles } from 'vtex.css-handles';

const CSS_HANDLES = [
  'formContainer',
  'formField',
  'formField__label',
  'formField__input',
  'formField__select',
  'formField__textArea',
  'formButton',
  'formErrorMessage',
  'formSuccessMessage'
] as const;

export const ContactForm: React.FC = () => {
  const { handles } = useCssHandles(CSS_HANDLES);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',  // Será mapeado como "title" ao enviar
    orderNumber: '',
    category: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};

    if (!formData.name) formErrors.name = 'Nome é obrigatório';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email inválido';
    if (!formData.subject) formErrors.subject = 'Assunto é obrigatório';
    if (!formData.category) formErrors.category = 'Categoria é obrigatória';
    if (!formData.message) formErrors.message = 'Mensagem é obrigatória';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Ajuste: Mapear "subject" como "title" para a API VTEX
    const formDataToSend = {
      name: formData.name,
      email: formData.email,
      title: formData.subject,  // Mapeado corretamente
      orderNumber: formData.orderNumber || null,
      category: formData.category,
      message: formData.message,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/dataentities/CT/documents', {
        method: 'POST',
        body: JSON.stringify(formDataToSend),
        headers: {
          Accept: 'application/vnd.vtex.ds.v10+json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao enviar formulário:', errorData);
        throw new Error(`Erro ao enviar o formulário: ${errorData.message || response.statusText}`);
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        orderNumber: '',
        category: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={handles.formContainer} aria-label="Formulário de Contato">
      <div className={handles.formField}>
        <label className={handles.formField__label} htmlFor="name">Nome do solicitante *</label>
        <input
          className={handles.formField__input}
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className={handles.formErrorMessage}>{errors.name}</p>}
      </div>
      <div className={handles.formField}>
        <label className={handles.formField__label} htmlFor="email">Email do solicitante *</label>
        <input
          className={handles.formField__input}
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className={handles.formErrorMessage}>{errors.email}</p>}
      </div>
      <div className={handles.formField}>
        <label className={handles.formField__label} htmlFor="subject">Dê um título a sua solicitação *</label>
        <input
          className={handles.formField__input}
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        {errors.subject && <p className={handles.formErrorMessage}>{errors.subject}</p>}
      </div>
      <div className={handles.formField}>
        <label className={handles.formField__label} htmlFor="orderNumber">Número do Pedido</label>
        <input
          className={handles.formField__input}
          id="orderNumber"
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
        />
      </div>
      <div className={handles.formField}>
        <label className={handles.formField__label} htmlFor="category">Categoria de assunto *</label>
        <select
          className={handles.formField__select}
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma opção</option>
          <option value="Loja Física">Loja Física</option>
          <option value="Loja Virtual">Loja Virtual</option>
        </select>
        {errors.category && <p className={handles.formErrorMessage}>{errors.category}</p>}
      </div>
      <div className={handles.formField}>
        <label className={handles.formField__label} htmlFor="message">Escreva sua solicitação *</label>
        <textarea
          className={handles.formField__textArea}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        {errors.message && <p className={handles.formErrorMessage}>{errors.message}</p>}
      </div>
      {success && (
        <p className={handles.formSuccessMessage}>Formulário enviado com sucesso!</p>
      )}
      <button type="submit" className={handles.formButton} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
};
