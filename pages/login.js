import Header from "../components/header.js"
import Footer from "../components/footer.js"
import styles from "../components/login.module.css"
import React, {useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Cookies } from 'react-cookie'

export default function Login(){

    const [values, setValues] = useState({email: '', password: ''})
    const cookies = new Cookies();

    let [token, setToken] = useState(cookies.get('token') || null)


    const handleImputChange = e => {
        const {name, value } = e.target

        setValues({...values, [name]:value})
        console.log(name, value)
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        // axios.post('https://localhost:3333/auths', values).then( (res) => {
        axios.post('https://hcodelab-next.herokuapp.com/auths', values).then( (res) => {
            
            const tokenData = res.data.token
            cookies.set('token', tokenData)          
            alert('Usuário Autorizado')
           window.location.href=('/admin')

        }).catch( err => console.log("Erro de Acesso", err))
            
            //alert(`Erro de Acesso: ${err}`)
    }

    return (
        <>
            <Header />
            <main id={styles.login} className={styles.page}>
                <hr className="italy" />
                <div className={styles['page-header']}>
                </div>
                <section>
                    <div className={styles.image}></div>
                    <form onSubmit= {handleFormSubmit} className={styles.form}>
                        <div>
                            <div className={styles.fields}>
                                <div className={styles.field}>
                                    <input type="email" name="email" id="email" onChange={handleImputChange} onFocus={handleImputChange}/>
                                    <label htmlFor="email">E-mail</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="password" name="password" id="password" onChange={handleImputChange} onFocus={handleImputChange}/>
                                    <label htmlFor="password">Senha</label>
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <button type="submit">Entrar</button>
                                <a href="#">Esqueci a senha</a>
                            </div>
                        </div>
                        <p>Você ainda não tem conta, 
                            e cadastre-se.</p>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    )
}