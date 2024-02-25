import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'

import CheckBox from '@/common/ui/checkbox/CheckBox'
import { LoginSchema, loginSchema } from '@/components/SignIn/utils/loginSchema'
import { useLoginMutation, useMeQuery } from '@/service/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signIn.module.scss'
const SignIn = () => {
  const [login] = useLoginMutation()
  const { data: me } = useMeQuery()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginSchema>({
    defaultValues: { email: '', password: '', rememberMe: false },
    resolver: zodResolver(loginSchema),
  })
  const navigate = useNavigate()
  const onSubmit = (data: LoginSchema) => {
    login(data).then(() => {
      navigate('/')
    })
  }

  if (me?.resultCode === 0) {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      <form className={s.formSignIn} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.signIntLabel}>
          <p>
            To log in get registered &nbsp;
            <a href={'https://social-network.samuraijs.com/'} target={'opener'}>
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p> Email: free@samuraijs.com</p>
          <p>Password: free</p>
        </label>
        <input {...register('email')} placeholder={'expample@mail.com'} />
        {errors.email && <div className={s.errorMessage}>{errors.email.message}</div>}
        <input {...register('password')} placeholder={'Your password'} type={'password'} />
        {errors.password && <div className={s.errorMessage}>{errors.password.message}</div>}
        <CheckBox
          {...register('rememberMe')}
          className={s.checkBox}
          id={'c1'}
          label={'Remember me'}
        />
        <button className={s.sendButton}>Submit</button>
      </form>
    </div>
  )
}

export default SignIn
