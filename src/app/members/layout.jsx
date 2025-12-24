import { Encode_Sans } from 'next/font/google';
import '../globals.css';


const encodeSans = Encode_Sans({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

export default function RootLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}