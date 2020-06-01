import Layout from '../../components/admin/Layout'
import HeaderTitle from '../../components/admin/HeaderTitle'
import { handleAuthSSR } from '../../utils/auth'

export default function Contacts() {

    return (
        <Layout>

            <HeaderTitle text="Bem Vindo" />

        </Layout>
    )

}


Contacts.getInitialProps = async (ctx) => {
    await handleAuthSSR(ctx)
    return {}
}