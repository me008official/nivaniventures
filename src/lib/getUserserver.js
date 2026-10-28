import { cookies } from 'next/headers';
// import { verify } from '@/services/jwt/jwt';
import { adminVerifyToken } from '@/services/bcrypt/admin/jwt';

export const getUserserver = async () => {

    // read cookies 

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    console.log("get token" + token)
    const verifyToken = await adminVerifyToken(token, process.env.JWT_SECRET);
    return verifyToken;

}