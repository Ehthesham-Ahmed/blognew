import { Avatar, Button, Dropdown, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import Home from '../pages/Home';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function NavbarLink({ to, children, ...props }) {
    return (
        <Link to={to} {...props}>
            {children}
        </Link>
    );
}
export default function Head() {
    const path = useLocation().pathname;
    const location = useLocation();
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    //console.log(searchTerm);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    return (
        <Navbar className='border-b-2 dark:text-gray-200 dark:bg-[rgb(16,23,42)]'>
            <Link
                to='/'
                className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    SEA's
                </span>
                Blog
            </Link>
            <div className='relative flex items-center w-full max-w-xs'>
                <form className='flex-grow mx-4 flex justify-center px-2 py-2'
                    onSubmit={handleSubmit}>
                    <TextInput
                        className='hidden lg:inline dark:bg-[rgb(16,23,42)] dark:text-black-400'
                        //className='dark:bg-[rgb(16,23,42)]'
                        //className="bg-black text-white"
                        type='text'
                        placeholder='Search...'
                        rightIcon={() => <AiOutlineSearch className='my-3' />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* </form> */}
                    <Button className='flex items-center justify-center w-12 h-10 lg:hidden dark:bg-[rgb(16,23,42)]'
                        color='gray' pill>
                        <AiOutlineSearch />
                    </Button>
                </form>
            </div>

            <div className='flex gap-2 md:order-2'>
                <Button
                    className='w-12 h-10 flex items-center justify-center sm:inline dark:bg-[rgb(16,23,42)]'
                    color='gray'
                    pill
                    onClick={() => dispatch(toggleTheme())}
                >
                    <div className='mx-auto'>

                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </div>

                </Button>
                {currentUser ? (
                    <Dropdown
                        className='dark:bg-[rgb(16,23,42)]'
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentUser.profilePicture}
                                rounded
                                className="border-2 border-black"
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>

                    </Dropdown>
                ) : (
                    <Link to='/sign-in'>
                        <Button className='w-12 h-10 hidden sm:inline 
                        bg-blue-400 rounded-xl' color='gray'>
                            Sign In
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>

                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>

                <Navbar.Link active={path === "/projects"} as={'div'}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>

        </Navbar>

    )
}
