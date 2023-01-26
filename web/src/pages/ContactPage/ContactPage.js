import { Form, TextField, TextAreaField, Submit, FieldError, Label, useForm, FormError  } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`


const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {onCompleted:() => {
    toast.success("Thanks for the message")
    formMethods.reset()
  }})
  const onSubmit = (data) => {
    console.log(data)
    create({
      variables: {
        input: data
      }
    })
  }
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />

      <Form onSubmit={onSubmit} formMethods={formMethods} error={error}>
        <FormError error={error} wrapperClassName="form-error" />
        <Label name="name" errorClassName="error">Name</Label>
        <TextField name="name" errorClassName="error" validation={{ required: true}} />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">Email</Label>
        <TextField name="email" errorClassName="error" validation={{ required: true,


          }}
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">message</Label>
        <TextAreaField name="message" errorClassName="error" validation={{ required: true}}/>
        <FieldError name="message" className="error" />

      <Submit disabled={loading}>Send the Message</Submit>

      </Form>

    </>
  )
}

export default ContactPage
