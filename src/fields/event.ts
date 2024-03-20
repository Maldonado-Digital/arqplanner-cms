import type { Field } from 'payload/types'

export const event: Field = {
  name: 'event',
  type: 'group',
  localized: true,
  label: 'Compromisso',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Título do compromisso',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Descreva os detalhes do compromisso...',
      },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Data',
      localized: true,
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: "dd/MM/yyyy 'às' HH:mm",
        },
        placeholder: 'dd/mm/aaaa às 00:00',
      },
    },
    {
      name: 'address',
      type: 'text',
      label: 'Endereço',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Endereço do compromisso',
      },
    },
    {
      name: 'professional_name',
      type: 'text',
      label: 'Nome do Profissional',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Nome do profissional',
      },
    },
    {
      name: 'profession',
      type: 'text',
      label: 'Profissão',
      localized: true,
      admin: {
        placeholder: 'Profissão',
      },
    },
    {
      name: 'contact_number',
      type: 'text',
      label: 'Telefone de Contato',
      required: true,
      localized: true,
      admin: {
        placeholder: '(99) 99999-9999',
      },
    },
    {
      name: 'contact_email',
      type: 'email',
      label: 'Email de Contato',
      localized: true,
      admin: {
        placeholder: 'email@exemplo.com',
      },
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram',
      localized: true,
      admin: {
        placeholder: 'Instagram',
      },
    },
  ],
}
