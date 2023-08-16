'use client';

import axios from 'axios'
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from '../hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';



const RegisterModel = () => {
    const RegisterModel = useRegisterModal();
    const [isLoading, setIsLoading]= useState(false);


    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
     } = useForm<FieldValues>({
            defaultValues: {
                name: '',
                email: '',
                password: '',
            }
        });

    const onSubmit: SubmitHandler<FieldValues>=  (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
        .then(()=> {
            RegisterModel.onClose();
        })
         .catch((error)=> {
            toast.error("something went wrong")
         })
         .finally(()=>{
            setIsLoading(false);
         })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
           <Heading 
            title='welcome to airbnb'
            subtitle='create an account!'
           />
           <Input
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
           />
            <Input
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
           />
            <Input
            id='password'
            type='password'
            label='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
           />
        </div>
    )
  return (
    <Modal
          disabled={isLoading}
          isOpen={RegisterModel.isOpen}
          title='Register'
          actionLabel='Continue'
          onClose={RegisterModel.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
    />
  )
}

export default RegisterModel