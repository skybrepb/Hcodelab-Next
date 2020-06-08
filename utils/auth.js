import axios from 'axios'
import Router from 'next/router'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()
const serverUrl = 'https://hcodelab-next.herokuapp.com'

export async function handleAuthSSR(ctx) {
    let token = null

    if(ctx.req) {
        token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    } else {
        token = cookies.get('token')
    }
    
    try {

        const config = { 
            header: { Autorization: `Bearer ${token}`}
        }

        await axios.get(serverUrl + '/admin/users', config)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
    } catch (err) {
        console.log('Usuário sem permissão')

        if (ctx.res) {
            ctx.res.writeHead(302, {
                location: '/'
            })
            ctx.res.end()
        } else {
            Router.push('/admin')
        }
    }
    
}