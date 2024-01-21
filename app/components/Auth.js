'use client'
import { useEffect, useState } from 'react';
import Link from "next/link"
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


function LogoutButton({ setToken }) {
    const router = useRouter();
    return <button className='border-green-400 border-2 hover:bg-green-400 hover:text-black text-green-400 font-bold py-2 px-4 ' onClick={() => {
        Cookies.remove('token'); // This line removes the token from the cookie
        console.log('logging out')
        setToken(false)
        router.push('/');
    }}>LOG OUT</button>
}

function AuthButtons() {
    const [token, setToken] = useState(Cookies.get('token'))
    return <>
        {token ? <LogoutButton setToken={setToken} /> : <SigninButton />}
    </>
}

function SigninButton() {
    return (
        <button className='border-green-400 border-2 hover:bg-green-400 hover:text-black text-green-400 font-bold py-2 px-4 '><Link href='/auth/login'>LOG IN</Link></button>
    )
}

function SignupButton() {

    return
}


function WithAuthMenu(Component) {
    return function AuthenticatedComponent(props) {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            }
        }, []);

        return <Component {...props} />;
    };
}



export { AuthButtons as SignupButton, WithAuthMenu }