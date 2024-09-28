import { Link, useNavigate } from 'react-router-dom'
import styles from './formStyles.module.css'
import * as Yup from 'yup'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addData } from './redux/dataSlice'
import { useAppSelector } from './redux/store'
import validationSchema, { FormErrors } from '../schema'

const CustomForm = () => {
  const countries = useAppSelector((state) => state.countries)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)

  const [errors, setErrors] = useState<FormErrors>({})
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const formObject = {
      name: formData.get('name') as string,
      age: formData.get('age') !== '' ? Number(formData.get('age')) : undefined,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'on',
      image: await fileToBase64(formData.get('image') as File),
      country: formData.get('country') as string,
    }

    try {
      await validationSchema.validate(formObject, { abortEarly: false })
      dispatch(addData({ data: formObject, formType: 'customForm' }))
      navigate('/')
      console.log('Submitted:', formObject)
    } catch (validationErrors) {
      const formattedErrors: FormErrors = {}

      if (validationErrors instanceof Yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path !== undefined) {
            formattedErrors[error.path] = error.message
          }
        })
        setErrors(formattedErrors)
      }
    }
  }

  const getPasswordStrength = (password: string) => {
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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <div className={styles.form}>
      <h2>Custom Form</h2>
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <input className={styles.input} placeholder="Input name" name="name" />
        {errors.name && <div className={styles.error}>{errors.name}</div>}

        <input
          className={styles.input}
          placeholder="Input age"
          name="age"
          type="number"
        />
        {errors.age && <div className={styles.error}>{errors.age}</div>}

        <input
          className={styles.input}
          placeholder="Input email"
          name="email"
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}

        <input
          className={styles.input}
          placeholder="Input password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password}</div>
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
          name="confirmPassword"
          type="password"
        />
        {errors.confirmPassword && (
          <div className={styles.error}>{errors.confirmPassword}</div>
        )}

        <div className={styles.customRadio}>
          <label>Gender:</label>
          <input type="radio" name="gender" value="male" />
          Male
          <input type="radio" name="gender" value="female" />
          Female
          {errors.gender && <div className={styles.error}>{errors.gender}</div>}
        </div>

        <div>
          <label htmlFor="terms">
            I accept Terms and Conditions agreement:
          </label>
          <input id="terms" type="checkbox" name="terms" />
          {errors.terms && <div className={styles.error}>{errors.terms}</div>}
        </div>

        <div>
          <label htmlFor="image">Upload image:</label>
          <input
            id="image"
            type="file"
            accept="image/jpeg, image/png"
            name="image"
          />
          {errors.image && <div className={styles.error}>{errors.image}</div>}
        </div>

        <div>
          <label htmlFor="country">Choose country: </label>
          <input id="country" list="countries" name="country" />
          <datalist id="countries">
            {countries.map((country: string, index: number) => (
              <option key={index} value={country} />
            ))}
          </datalist>

          {errors.country && (
            <div className={styles.error}>{errors.country}</div>
          )}
        </div>

        <button type="submit">Send</button>
      </form>

      <Link to="/">Back to main</Link>
    </div>
  )
}

export default CustomForm
