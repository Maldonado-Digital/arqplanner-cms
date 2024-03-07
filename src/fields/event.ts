import type { Field } from 'payload/types'

export const event: Field = {
  name: 'event',
  type: 'group',
  localized: true,
  label: 'Evento',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Título do evento',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Descreva os detalhes do evento...',
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
          displayFormat: "dd/MM/yyyy 'às' hh:mm",
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
        placeholder: 'Endereço do evento',
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
