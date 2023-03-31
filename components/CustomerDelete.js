import { useEffect } from'react';
import { deleteCustomer, getCustomer } from '.././lib/helper';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAction, setFormData, toggleDelete } from '.././redux/reducer';
import { VscCheck, VscClose } from 'react-icons/vsc';

export default function CustomerDelete() {
    
    const dispatch = useDispatch();
    const id = useSelector(state => state.app.id);
    const formData = useSelector(state => state.app.formData);

    const { first_name, last_name } = formData;
    
    useEffect(() => {
        // Get customer data by id and send it to formData
        const fetchCustomer = async () => {
            const customer = await getCustomer(id);
            await dispatch(setFormData(customer));
        }
        fetchCustomer();
    }, [id]);

    const deleteHandler = async () => {
        
        const deletedCustomer = await deleteCustomer(id);
        await dispatch(setFormData(deletedCustomer));
        await dispatch(deleteAction(null));
        await dispatch(toggleDelete(false));
    }

    const cancelHandler = async () => {
        await dispatch(deleteAction(null));
        await dispatch(toggleDelete(false));
    }

    return (
        <div className="flex items-center space-x-1">
            <p className='text-xl mr-3'>Delete {first_name} {last_name}?</p>
            <button 
                onClick={cancelHandler}
                className="flex text-md bg-green-500 text-white px-4 py-2 rounded-xl border-rounded-xl hover:bg-green-500 hover:border-green-500 hover:text-grey-50">
                Cancel
                <span className='my-auto mx-1'><VscClose /></span>
            </button>
            <button
                onClick={deleteHandler}
                className="flex text-md bg-red-500 text-white px-4 py-2 rounded-xl border-rounded-xl hover:bg-rose-500 hover:border-red-500 hover:text-grey-50">
                Delete
                <span className='my-auto mx-1'><VscCheck /></span>
            </button>
        </div>
    )
}