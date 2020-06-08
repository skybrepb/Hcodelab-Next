import Header from "../components/header.js"
import Footer from "../components/footer.js"
import styles from "../components/register.module.css"
import React, {useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Cookies } from 'react-cookie'

export default function Register(){
    const [values, setValues] = useState({name: '', email: '', password: '', birth_at: '', level: '1', photo: 'user.png'})

    const handleImputChange = e => {
        const {name, value } = e.target

        setValues({...values, [name]:value})
        console.log(name, value)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        console.log('EventoSubmit',e)

        //axios.post('http://localhost:3333/users', values).then( res => {
        axios.post('https://hcodelab-next.herokuapp.com/admin/users', values).then( res => {
            
             alert(`Ola ${res.data.name} seus dados cadastrados com sucesso ID: ${res.data.id}`)
             window.location.href=("/login") // Redireciona para a pagina login
        }).catch( err => console.log("Erro de Cadastro", err))

    }



    return (
        <>
            <Header />
            <main id={styles.register} className={styles.page}>
                <hr className="italy" />
                <div className={styles["page-header"]}>
                </div>
                <section>
                    <div className={styles['image']}></div>
                    <form onSubmit= {handleFormSubmit} className={styles.form}>
                        <div>
                            <div className={styles.fields}>
                                <div className={styles.field}>
                                    <input type="text" name="name" id="name"  onChange={handleImputChange} onFocus={handleImputChange}/>
                                    <label htmlFor="name">Nome Completo</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="email" name="email" id="email" onChange={handleImputChange} onFocus={handleImputChange}/>
                                    <label htmlFor="email">E-mail</label>
                                </div>
                            </div>
                            <div className={styles.fields}>
                                <div className={styles.field}>
                                    <input type="date" name="birth_at" id="birth_at" onChange={handleImputChange} onFocus={handleImputChange}/>
                                    <label htmlFor="birth">Data de Nascimento</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="password" name="password" id="password" onChange={handleImputChange} onFocus={handleImputChange}/>
                                    <label htmlFor="password">Senha</label>
                                </div>
                            </div>
                            <button type="submit">Entrar</button>
                        </div>
                        <p>Se você já possui uma conta, 
                        <Link href="/login">
                            <a title="Cadastre-se">clique aqui</a> 
                        </Link>
                            para fazer o login.</p>
                    </form>
                </section>
            </main>
        
            <Footer />
        </>
    )
}