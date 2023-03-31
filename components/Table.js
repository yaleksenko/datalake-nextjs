import Image from 'next/image';
import { useEffect } from'react';
import { getCustomers } from '.././lib/helper';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { useSelector, useDispatch } from 'react-redux';
import { setCustomers, toggleChangeAction, updateAction, deleteAction, toggleDelete } from '.././redux/reducer';

export default function Table() {
    const dispatch = useDispatch();

    const id = useSelector(state => state.app.id);
    const formData = useSelector(state => state.app.formData);
    const filter = useSelector(state => state.app.filter);
    const filteredCustomers = useSelector(state => state.app.filteredCustomers);
    const FormOpen = useSelector((state) => state.app.toggleForm);

    useEffect(() => {
        const fetchCustomers = async () => {
          // Get customers if id, FormOpen change
          const customers = await getCustomers();
          dispatch(setCustomers(customers));
        };
        fetchCustomers();
      }, [id, FormOpen]);
    
    const customers = useSelector(state => state.app.customers);
    const columns = [
        { title: '#'},
        { title: 'Photo', name: 'photo'},
        { title: 'First Name', name: 'first_name'},
        { title: 'Last Name', name: 'last_name'},
        { title: 'Email', name: 'email'},
        { title: 'Phone', name: 'phone'},
        { title: 'Address', name: 'address'},
        { title: 'Status', name: 'status'},
        { title: 'Action', name: 'action'}]

    return ( 
        <div className='container mx-auto'>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-blue-100">
                        <tr className='text-xs text-black uppercase text-center'>
                        {columns.map((col, index) => 
                            <th key={`${col.name}-${index}`} className="px-6 py-3 items-center"  >
                                {col.title}
                            </th>)}
                        </tr>
                    </thead>
                    <tbody className='container mx-auto' key="table-body">

                        {filter 
                        ? filteredCustomers.map((obj, index) => <Tr {...obj} key={`${obj.id}-${index}`} index={index + 1} />)
                        : (id ? <Tr {...formData} index={1} /> : customers.map((obj, index) => <Tr {...obj} key={`${obj.id}-${index}`} index={index + 1} />))
                        }

                    </tbody> 
                </table>
        </div>
    )
}

function Tr({_id, index, first_name, last_name, email, phone, address, photo, status}) {
    
    const FormOpen = useSelector((state) => state.app.toggleForm);
    const dispatch = useDispatch();
    
    const onUpdate = async () => {
        if (!FormOpen) {
            await dispatch(toggleChangeAction());
            await dispatch(updateAction(_id));  
        }
        await dispatch(updateAction(_id));
    }

    const onDelete = async () => {
        if (!FormOpen) {
            await dispatch(deleteAction(_id));
            await dispatch(toggleDelete());
        }
    }
    
    return (
        <tr className='font-medium whitespace-nowrap text-gray-900 bg-white border-b hover:bg-blue-50'>
            <th className="px-6 py-3 w-12 text-center" key={`header-${index}`}>
                {index}
            </th>
            <td className="px-6 py-3 w-24 items-center">
                { photo && ( <Image
                    src={photo}
                    alt=""
                    width={12}
                    height={12}
                    className="h-12 w-12 object-cover"
                    unoptimized
                /> )}
            </td>
            <td className="px-6 py-3 w-36 max-w-xs break-words whitespace-normal">
                {first_name || 'Unknown'}
            </td>
            <td className="px-6 py-3 w-36 max-w-xs break-words whitespace-normal">
                {last_name || 'Unknown'}
            </td>
            <td className="px-6 py-3 w-48 max-w-xs break-words whitespace-normal">
                {email || 'Unknown'}
            </td>
            <td className="px-6 py-3 w-48 max-w-xs break-words whitespace-normal">
                {phone || 'Unknown'}
            </td>
            <td className="px-6 py-3 w-72 max-w-xs break-words whitespace-normal">
                {address || 'Unknown'}
            </td>
            <td className="px-6 py-3 w-24 text-center">
                <button className=''>
                    <span className={`${status == 'Active' ? 'bg-green-500' : 'bg-rose-500'} text-white px-3 py-1 rounded-xl`}>{status || 'No Status'}</span>
                </button>
            </td>
            <td className="px-6 py-3 w-36">
                <div className='flex justify-center align-middle'>
                    <button className='cursor mr-2' onClick={onUpdate}>
                        <span className=''>
                        <VscEdit /> 
                        </span>
                    </button>
                    <button className='cursor ml-2' onClick={onDelete}>
                        <span className=''>
                        <VscTrash />
                        </span>
                    </button>
                </div>
            </td>
        </tr>
    )
}
