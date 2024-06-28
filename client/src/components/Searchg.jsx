import { TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    console.log(sidebarData);

    useEffect = () => ({
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            });
        }
    }, [location.search]);

    return (
        <div>
            <div className=''>

                <form>
                    <div className=''>
                        <lable> Search Term: </lable>
                        <TextInput placeholder='Search...'
                            id='searchTerm'
                            type='text' />
                    </div>
                </form>
            </div>
        </div>
    );
}
