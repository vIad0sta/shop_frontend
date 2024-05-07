import React, {useState} from 'react';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import AuthRequests from "../Requests/AuthRequests";
import axios from 'axios';
import CartOverlay from "./CartOverlay";

const NavBar = () => {
    const handleLogout = async () => {
        await AuthRequests.logout()
        window.location.href = '/login'
    }
    const [isCartOpen, setIsCartOpen] = useState(false); // State to manage cart visibility

    const [signedIn, setSignedIn] = useState(localStorage.getItem('signedIn') === 'true');
    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    }
    return (
        <AppBar position="fixed" >
            <Toolbar>

                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                     width="100.000000pt" height="70.000000pt" viewBox="0 0 384.000000 341.000000"
                     preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,341.000000) scale(0.100000,-0.100000)"
                       fill="#000000" stroke="none">
                        <path d="M1786 3299 c-647 -54 -1147 -625 -1113 -1269 18 -330 147 -607 389
-835 402 -378 1002 -436 1473 -143 70 43 132 94 206 168 188 186 292 377 345
630 27 128 25 354 -4 486 -134 606 -684 1014 -1296 963z m259 -50 c441 -61
814 -366 955 -783 81 -238 83 -513 4 -753 -93 -284 -318 -544 -589 -680 -73
-37 -242 -96 -254 -89 -4 3 -11 25 -14 49 -3 23 -9 50 -12 59 -5 12 5 16 51
21 38 4 69 15 95 33 62 43 313 284 324 311 8 21 5 29 -19 50 -22 19 -37 23
-70 21 -33 -2 -40 -6 -38 -21 3 -18 -13 -50 -40 -78 -7 -8 -53 -60 -102 -117
-116 -134 -127 -142 -190 -142 -45 0 -55 4 -86 36 -51 53 -99 74 -167 74 -70
0 -125 -24 -172 -74 -32 -33 -40 -36 -91 -36 -55 0 -56 1 -117 63 -108 110
-212 238 -215 266 -2 21 -9 27 -35 29 -40 4 -89 -21 -99 -50 -6 -20 11 -40
124 -149 192 -184 227 -210 302 -216 57 -5 61 -8 56 -27 -4 -12 -9 -40 -12
-63 -4 -24 -11 -43 -16 -43 -27 0 -201 66 -272 103 -156 81 -329 234 -426 376
-63 94 -137 256 -167 368 -25 91 -27 113 -27 298 0 186 2 207 27 300 154 569
715 945 1292 864z"/>
                        <path d="M1780 2994 c-103 -36 -163 -122 -164 -239 l-1 -60 50 -3 c46 -3 65 4
217 82 115 59 182 87 217 92 28 4 51 9 51 11 0 16 -37 62 -65 82 -74 50 -214
66 -305 35z"/>
                        <path d="M2398 2851 c-75 -24 -159 -73 -293 -167 -382 -270 -493 -324 -661
-324 -136 0 -255 53 -354 156 -39 41 -59 55 -54 41 47 -150 207 -375 337 -473
83 -62 137 -85 224 -91 120 -9 195 32 228 126 24 68 20 85 -35 143 -27 29 -50
58 -50 64 0 7 19 19 43 29 23 9 74 41 112 70 81 62 116 78 151 69 56 -14 68
-76 33 -169 -28 -75 -61 -111 -120 -132 -27 -10 -49 -21 -49 -24 0 -4 19 -10
43 -14 38 -6 44 -11 67 -58 46 -93 124 -117 253 -77 130 40 329 203 405 331
97 165 97 332 2 427 -77 78 -184 105 -282 73z"/>
                        <path d="M1625 1816 c-62 -28 -105 -94 -105 -162 0 -53 21 -92 116 -218 l87
-117 21 19 c38 35 64 42 160 42 93 0 96 -1 131 -31 20 -18 37 -30 39 -28 52
59 189 262 197 292 28 106 -60 216 -173 217 -55 0 -84 -15 -140 -70 -28 -28
-54 -50 -60 -50 -5 0 -30 21 -56 46 -26 26 -61 53 -79 60 -40 17 -99 17 -138
0z"/>
                        <path d="M1110 460 l0 -320 45 0 45 0 0 90 c0 78 17 160 33 160 2 0 26 -56 53
-125 l48 -125 53 0 c31 0 53 4 53 11 0 5 -31 87 -70 182 -38 94 -70 177 -70
184 0 8 27 67 60 133 33 66 60 122 60 125 0 3 -22 5 -50 5 l-50 0 -50 -99
c-51 -103 -73 -131 -70 -90 1 13 2 61 1 107 l-1 82 -45 0 -45 0 0 -320z"/>
                        <path d="M1572 468 c-29 -172 -52 -316 -52 -320 0 -5 22 -8 49 -8 l49 0 7 53
c13 89 18 97 69 97 50 0 51 -1 62 -92 l6 -58 49 0 c43 0 49 3 49 21 0 18 -82
523 -96 592 -5 26 -8 27 -72 27 l-67 0 -53 -312z m141 19 c7 -53 11 -100 9
-102 -3 -3 -18 -5 -34 -5 -22 0 -28 4 -28 23 1 19 26 193 31 207 3 9 9 -25 22
-123z"/>
                        <path d="M1950 460 l0 -320 50 0 50 0 0 121 0 120 32 -3 c30 -3 32 -5 50 -83
39 -167 32 -155 88 -155 30 0 50 4 50 11 0 6 -14 67 -32 135 l-32 123 24 43
c22 38 25 55 25 138 -1 160 -33 190 -204 190 l-101 0 0 -320z m198 208 c7 -7
12 -41 12 -84 0 -86 -12 -104 -71 -104 l-39 0 0 100 0 100 43 0 c24 0 48 -5
55 -12z"/>
                        <path d="M2460 770 c0 -5 -22 -141 -50 -301 -27 -160 -50 -300 -50 -310 0 -16
8 -19 49 -19 l49 0 6 58 c11 92 11 92 66 92 54 0 51 4 66 -102 l6 -48 49 0
c40 0 49 3 49 18 0 9 -23 150 -50 312 -28 162 -50 298 -50 303 0 4 -31 7 -70
7 -39 0 -70 -4 -70 -10z m88 -259 c17 -130 17 -131 -18 -131 -24 0 -30 4 -30
21 0 42 24 199 30 199 4 0 12 -40 18 -89z"/>
                    </g>
                </svg>


                <Button onClick={() => window.location.href = '/'} color="inherit">Home</Button>
                {!signedIn && <Button onClick={() => window.location.href = '/login'} color="inherit">Login</Button>}
                {!signedIn && <Button onClick={() => window.location.href = '/registration'} color="inherit">Registration</Button>}
                {signedIn && <Button onClick={() => window.location.href = '/profile'} color="inherit">Profile</Button>}
                {signedIn && <Button onClick={handleLogout} color="inherit">Logout</Button>}
                <Button onClick={handleCartClick} style={{ position: 'absolute', right: 40 }}>
                    <svg fill="#FFFFFF" height="28" viewBox="0 0 16 16" width="28" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M8 2C7.20097 2 6.48245 2.48647 6.1857 3.22834L5.47703 5H3.32297L4.32874 2.48556C4.92922 0.984369 6.38316 0 8 0C9.61684 0 11.0708 0.984368 11.6713 2.48556L12.677 5H10.523L9.81431 3.22834C9.51755 2.48647 8.79903 2 8 2Z"/>
                        <path fill="#FFFFFF" d="M15 7H1V9L3 15H13L15 9V7Z"/>
                    </svg>
                </Button>
                <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
