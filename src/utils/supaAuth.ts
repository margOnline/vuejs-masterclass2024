import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

export const register = async (formData: RegisterForm) => {
  const { error, data } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password
  })

  if (error) return console.error('Auth signup err: ', error)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.firstName.concat(' ', formData.lastName)
    })
    if (error) return console.log('Profiles insert err: ', error)
  }
  return true
}

export const signIn = async (formData: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  return { error }
}

export const signout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) return console.error('Signout err: ', error)
  return true
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
