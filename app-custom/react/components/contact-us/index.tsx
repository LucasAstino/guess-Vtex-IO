import React, { useState } from 'react';
import { useCssHandles } from 'vtex.css-handles';

const CSS_HANDLES = [
  'formContainer',
  'formField',
  'formField__label',
  'formField__input',
  'formField__input-file',
  'formField__label-file',
  'formField__select',
  'formField__textArea',
  'formButton',
  'formErrorMessage',
  'formSuccessMessage'
] as const;

export const ContactForm: React.FC = () => {
  const {handles} = useCssHandles(CSS_HANDLES);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    orderNumber: '',
    category: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};

    if (!formData.name) formErrors.name = 'Nome é obrigatório';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email inválido';
    if (!formData.subject) formErrors.subject = 'Assunto é obrigatório';
    if (!formData.message) formErrors.message = 'Mensagem é obrigatória';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("orderNumber", formData.orderNumber);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("message", formData.message);

    if (file) {
      formDataToSend.append("file", file); // Adiciona o arquivo ao FormData
    }

    try {
      const response = await fetch('/api/dataentities/YOUR_ENTITY/documents', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Accept: 'application/vnd.vtex.ds.v10+json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar o formulário: ${response.statusText}`);
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
      setFile(null);
    } catch (error) {
      console.error(error);
      setSuccess(false);
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
        >
          <option value="">Selecione uma opção</option>
          <option value="Loja Física">Loja Física</option>
          <option value="Loja Virtual">Loja Virtual</option>
        </select>
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
      <div className={handles.formField}>
        <label className={handles['formField__label-file']} htmlFor="file">Clique aqui para selecionar arquivos que deseja anexar</label>
        <input
          className={handles['formField__input-file']
          }
          id="file"
          name="file"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      {success && (
        <p className={handles.formSuccessMessage}>Formulário enviado com sucesso!</p>
      )}
      <button type="submit" className={handles.formButton}>
        Enviar
      </button>
    </form>
  );
};
