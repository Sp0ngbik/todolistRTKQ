import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CheckBox from '@/common/ui/checkbox/CheckBox'
import { LoginSchema, loginSchema } from '@/components/SignIn/utils/loginSchema'
import { useLoginMutation } from '@/service/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signIn.module.scss'
const SignIn = () => {
  const [login] = useLoginMutation()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginSchema>({
    defaultValues: { email: '', password: '', rememberMe: false },
    resolver: zodResolver(loginSchema),
  })
  const navigate = useNavigate()
  const onSubmit = (data: any) => {
    login(data).then(() => {
      navigate('/')
    })
  }

  return (
    <div>
      <form className={s.formSignIn} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} placeholder={'expample@mail.com'} />
        {errors.email && <div className={s.errorMessage}>{errors.email.message}</div>}
        <input {...register('password')} placeholder={'Your password'} type={'password'} />
        {errors.password && <div className={s.errorMessage}>{errors.password.message}</div>}
        <CheckBox {...register('rememberMe')} className={s.checkBox} label={'Remember me'} />
        <button className={s.sendButton}>Send</button>
      </form>
    </div>
  )
}

export default SignIn
