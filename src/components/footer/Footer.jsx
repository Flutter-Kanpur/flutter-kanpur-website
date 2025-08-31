// import React from 'react'
// import './Footer.css';
// import Image from 'next/image';
// const Footer = () => {
//   return (
//     <div className='footer'>
//       <div className='left-part-footer'>
//         <p>Quick Links</p>
//         <ul>
//           <li>Home</li>
//           <li>Events & Workshop</li>
//           <li>Blog & Resources</li>
//           <li>Job & Project Board</li>
//           <li>Community Dashboard</li>
//         </ul>
//       </div>
//       <div className='right-part-footer'>
//         <div className='socials'>
//           <p><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M26.1836 10.3816C26.171 9.43484 25.9938 8.49753 25.6598 7.61156C25.3703 6.86425 24.928 6.18556 24.3613 5.61885C23.7946 5.05214 23.1159 4.60988 22.3686 4.32031C21.494 3.99201 20.5701 3.81449 19.6361 3.79531C18.4336 3.74156 18.0523 3.72656 14.9998 3.72656C11.9473 3.72656 11.5561 3.72656 10.3623 3.79531C9.42879 3.81463 8.50528 3.99215 7.63109 4.32031C6.88367 4.60967 6.20487 5.05187 5.63813 5.6186C5.0714 6.18534 4.62921 6.86414 4.33984 7.61156C4.01088 8.48548 3.83375 9.4092 3.81609 10.3428C3.76234 11.5466 3.74609 11.9278 3.74609 14.9803C3.74609 18.0328 3.74609 18.4228 3.81609 19.6178C3.83484 20.5528 4.01109 21.4753 4.33984 22.3516C4.62969 23.0988 5.07221 23.7773 5.63914 24.3438C6.20606 24.9103 6.88492 25.3523 7.63234 25.6416C8.50414 25.9831 9.42781 26.1733 10.3636 26.2041C11.5673 26.2578 11.9486 26.2741 15.0011 26.2741C18.0536 26.2741 18.4448 26.2741 19.6386 26.2041C20.5725 26.1857 21.4965 26.0086 22.3711 25.6803C23.1182 25.3904 23.7967 24.948 24.3634 24.3814C24.9301 23.8147 25.3724 23.1362 25.6623 22.3891C25.9911 21.5141 26.1673 20.5916 26.1861 19.6553C26.2398 18.4528 26.2561 18.0716 26.2561 15.0178C26.2536 11.9653 26.2536 11.5778 26.1836 10.3816ZM14.9923 20.7528C11.7998 20.7528 9.21359 18.1666 9.21359 14.9741C9.21359 11.7816 11.7998 9.19531 14.9923 9.19531C16.525 9.19531 17.9948 9.80414 19.0785 10.8879C20.1623 11.9716 20.7711 13.4414 20.7711 14.9741C20.7711 16.5067 20.1623 17.9765 19.0785 19.0603C17.9948 20.144 16.525 20.7528 14.9923 20.7528ZM21.0011 10.3291C20.8241 10.3292 20.6488 10.2945 20.4852 10.2268C20.3217 10.1592 20.1731 10.0599 20.0479 9.93476C19.9227 9.8096 19.8235 9.66098 19.7558 9.49742C19.6882 9.33386 19.6534 9.15857 19.6536 8.98156C19.6536 8.80469 19.6884 8.62955 19.7561 8.46614C19.8238 8.30273 19.923 8.15425 20.0481 8.02918C20.1732 7.90411 20.3216 7.8049 20.485 7.73721C20.6485 7.66953 20.8236 7.63469 21.0005 7.63469C21.1773 7.63469 21.3525 7.66953 21.5159 7.73721C21.6793 7.8049 21.8278 7.90411 21.9529 8.02918C22.0779 8.15425 22.1771 8.30273 22.2448 8.46614C22.3125 8.62955 22.3473 8.80469 22.3473 8.98156C22.3473 9.72656 21.7448 10.3291 21.0011 10.3291Z" fill="url(#paint0_linear_295_985)" />
//             <path d="M14.992 18.7272C17.0652 18.7272 18.7458 17.0466 18.7458 14.9735C18.7458 12.9003 17.0652 11.2197 14.992 11.2197C12.9189 11.2197 11.2383 12.9003 11.2383 14.9735C11.2383 17.0466 12.9189 18.7272 14.992 18.7272Z" fill="url(#paint1_linear_295_985)" />
//             <defs>
//               <linearGradient id="paint0_linear_295_985" x1="3.74609" y1="15.0003" x2="26.2561" y2="15.0003" gradientUnits="userSpaceOnUse">
//                 <stop stop-color="#64A9DD" />
//                 <stop offset="1" stop-color="#E5E8EC" />
//               </linearGradient>
//               <linearGradient id="paint1_linear_295_985" x1="11.2383" y1="14.9735" x2="18.7458" y2="14.9735" gradientUnits="userSpaceOnUse">
//                 <stop stop-color="#64A9DD" />
//                 <stop offset="1" stop-color="#E5E8EC" />
//               </linearGradient>
//             </defs>
//           </svg>
//           </p>
//           <p><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M6.22914 8.99637C7.73964 8.99637 8.96414 7.77187 8.96414 6.26137C8.96414 4.75087 7.73964 3.52637 6.22914 3.52637C4.71864 3.52637 3.49414 4.75087 3.49414 6.26137C3.49414 7.77187 4.71864 8.99637 6.22914 8.99637Z" fill="url(#paint0_linear_295_981)" />
//             <path d="M11.5466 11.0684V26.2421H16.2579V18.7384C16.2579 16.7584 16.6304 14.8409 19.0854 14.8409C21.5066 14.8409 21.5366 17.1046 21.5366 18.8634V26.2434H26.2504V17.9221C26.2504 13.8346 25.3704 10.6934 20.5929 10.6934C18.2991 10.6934 16.7616 11.9521 16.1329 13.1434H16.0691V11.0684H11.5466ZM3.86914 11.0684H8.58789V26.2421H3.86914V11.0684Z" fill="url(#paint1_linear_295_981)" />
//             <defs>
//               <linearGradient id="paint0_linear_295_981" x1="3.49414" y1="6.26137" x2="8.96414" y2="6.26137" gradientUnits="userSpaceOnUse">
//                 <stop stop-color="#64A9DD" />
//                 <stop offset="1" stop-color="#E5E8EC" />
//               </linearGradient>
//               <linearGradient id="paint1_linear_295_981" x1="3.86914" y1="18.4684" x2="26.2504" y2="18.4684" gradientUnits="userSpaceOnUse">
//                 <stop stop-color="#64A9DD" />
//                 <stop offset="1" stop-color="#E5E8EC" />
//               </linearGradient>
//             </defs>
//           </svg>
//           </p>
//           <p><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M24.5412 9.99594C24.5575 10.2147 24.5575 10.4322 24.5575 10.6497C24.5575 17.3059 19.4912 24.9759 10.2325 24.9759C7.38 24.9759 4.73 24.1497 2.5 22.7147C2.905 22.7609 3.295 22.7772 3.71625 22.7772C5.98249 22.7827 8.18456 22.0249 9.9675 20.6259C8.91678 20.6069 7.89822 20.2603 7.05405 19.6344C6.20988 19.0085 5.58223 18.1346 5.25875 17.1347C5.57 17.1809 5.8825 17.2122 6.21 17.2122C6.66125 17.2122 7.115 17.1497 7.53625 17.0409C6.39595 16.8107 5.37059 16.1926 4.63452 15.2918C3.89845 14.391 3.49712 13.263 3.49875 12.0997V12.0372C4.17 12.4109 4.94875 12.6447 5.77375 12.6759C5.08261 12.2167 4.5159 11.5935 4.12417 10.8619C3.73245 10.1304 3.52789 9.31326 3.52875 8.48344C3.52875 7.54844 3.7775 6.69094 4.21375 5.94344C5.47892 7.49971 7.05688 8.77289 8.84542 9.68051C10.634 10.5881 12.5932 11.11 14.5963 11.2122C14.5188 10.8372 14.4712 10.4484 14.4712 10.0584C14.4709 9.39714 14.6009 8.74226 14.8538 8.13124C15.1068 7.52022 15.4776 6.96503 15.9452 6.49742C16.4128 6.02981 16.968 5.65895 17.5791 5.40604C18.1901 5.15312 18.845 5.02311 19.5062 5.02344C20.9562 5.02344 22.265 5.63094 23.185 6.61344C24.3122 6.39546 25.3932 5.98397 26.38 5.39719C26.0043 6.56071 25.2172 7.54732 24.1663 8.17219C25.166 8.05816 26.143 7.79525 27.065 7.39219C26.3764 8.39606 25.5232 9.27637 24.5412 9.99594Z" fill="url(#paint0_linear_295_989)" />
//             <defs>
//               <linearGradient id="paint0_linear_295_989" x1="2.5" y1="14.9997" x2="27.065" y2="14.9997" gradientUnits="userSpaceOnUse">
//                 <stop stop-color="#64A9DD" />
//                 <stop offset="1" stop-color="#E5E8EC" />
//               </linearGradient>
//             </defs>
//           </svg>
//           </p>
//         </div>
//         <div className='flutter-sphere'>
//           <Image src={'/landingPageIcons/flutter_icon.svg'} height={36} width={36}/>
//           <p>FlutterSphere</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Footer





import { Box, Typography, List, ListItem, IconButton, Stack } from '@mui/material';
import { Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import Image from 'next/image';

const FooterMUI = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#0d171e',
        borderRadius: '15px',
        mt: 4,
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: { xs: 3, md: 0 },
      }}
    >
      {/* Left Part */}
      <Box>
        <Typography variant="h6" sx={{ p: 2, m: 0 }}>
          Quick Links
        </Typography>
        <List sx={{ pl: 2, mt: 0 }}>
          {['Home', 'Events & Workshop', 'Blog & Resources', 'Job & Project Board', 'Community Dashboard'].map((item) => (
            <ListItem key={item} sx={{ p: 0, mb: 0 }}>
              <Typography variant="body1">{item}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Part */}
      <Box sx={{ pr: 2, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' }, gap: 2, padding: 5}}>
        {/* Social Icons */}
        <Stack direction="row" spacing={4}>
          <IconButton>
            <Instagram sx={{ fontSize: 30, color: '#64A9DD' }} />
          </IconButton>
          <IconButton>
            <LinkedIn sx={{ fontSize: 30, color: '#64A9DD' }} />
          </IconButton>
          <IconButton>
            <Twitter sx={{ fontSize: 30, color: '#64A9DD' }} />
          </IconButton>
        </Stack>

        {/* FlutterSphere */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Image src={'/landingPageIcons/flutter_icon.svg'} height={36} width={36} alt="flutter sphere" />
          <Typography sx={{ fontFamily: '"Familjen Grotesk", sans-serif', fontSize: '28px', fontWeight: 'bold' }}>
            FlutterSphere
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default FooterMUI;

