import React from 'react'
import { useWatch, FieldValues, useForm } from 'react-hook-form'
import CreateFrom from '../features/admin/CreateFrom'


type Props = {}

const CreateUser = (props: Props) => {
  return (
    <section className='main-section'>
     <CreateFrom/>
    </section >
  )
}

export default CreateUser