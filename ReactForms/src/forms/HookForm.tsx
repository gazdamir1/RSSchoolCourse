import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './formStyles.module.css'
import { useDispatch } from 'react-redux'
import { addData, IFormData } from './redux/dataSlice'
import { useAppSelector } from './redux/store'
import validationSchema, { ImageType } from '../schema'
import { InferType } from 'yup'

interface FormValues {
  name: string
  age: number
  email: string
  password: string
  confirmPassword: string
  gender: NonNullable<'male' | 'female' | undefined>
  terms: NonNullable<boolean | undefined>
  image: NonNullable<ImageType | undefined>
  country: string
}

const HookForm: React.FC = () => {
  const countries = useAppSelector((state) => state.countries)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })

  const password = watch('password', '')

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return
    if (password.length < 8) return 'Weak'
    if (
      password.match(/[A-Z]/) &&
      password.match(/[a-z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[!@#$%^&*]/)
    )
      return 'Strong'
    return 'Moderate'
  }

  const onSubmit: SubmitHandler<InferType<typeof validationSchema>> = async (
    data: FormValues,
  ) => {
    await validationSchema.validate(data, { abortEarly: false })
    const formattedData: IFormData = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      gender: data.gender,
      terms: data.terms,
      image: data.image ? String(data.image) : '',
      country: data.country,
    }

    dispatch(addData({ data: formattedData, formType: 'hookForm' }))
    console.log('Submitted:', formattedData)
    navigate('/')
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <div className={styles.form}>
      <h2>Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Input name"
          {...register('name')}
        />
        {errors.name && (
          <div className={styles.error}>{errors.name.message}</div>
        )}

        <input
          className={styles.input}
          placeholder="Input age"
          {...register('age')}
        />
        {errors.age && <div className={styles.error}>{errors.age.message}</div>}

        <input
          className={styles.input}
          placeholder="Input email"
          {...register('email')}
        />
        {errors.email && (
          <div className={styles.error}>{errors.email.message}</div>
        )}

        <input
          className={styles.input}
          placeholder="Input password"
          type="password"
          {...register('password')}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password.message}</div>
        )}
        <div className={styles.passwordStrength}>
          <label>Password Strength: </label>
          <span className={styles.strengthIndicator}>
            {getPasswordStrength(password)}
          </span>
        </div>

        <input
          className={styles.input}
          placeholder="Repeat password"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <div className={styles.error}>{errors.confirmPassword.message}</div>
        )}

        <div className={styles.customRadio}>
          <label>Gender:</label>
          <input type="radio" value="male" {...register('gender')} /> Male
          <input type="radio" value="female" {...register('gender')} /> Female
          {errors.gender && (
            <div className={styles.error}>{errors.gender.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="terms">
            I accept Terms and Conditions agreement:
          </label>
          <input id="terms" type="checkbox" {...register('terms')} />
          {errors.terms && (
            <div className={styles.error}>{errors.terms.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="image">Upload image:</label>
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, ref } }) => (
              <input
                id="image"
                type="file"
                accept="image/jpeg, image/png"
                ref={ref}
                onChange={async (e) => {
                  if (e.target.files) {
                    const file = e.target.files[0]
                    const base64 = await fileToBase64(file)
                    onChange(base64)
                  }
                }}
              />
            )}
          />
          {errors.image && (
            <div className={styles.error}>{errors.image.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="country">Choose country: </label>
          <input id="country" list="countries" {...register('country')} />
          <datalist id="countries">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          {errors.country && (
            <div className={styles.error}>{errors.country.message}</div>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isValid || !isDirty}
        >
          Send
        </button>
      </form>

      <Link to="/">Back to main</Link>
    </div>
  )
}

export default HookForm
