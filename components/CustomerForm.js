import CustomerCreate from './CustomerCreate';
import CustomerUpdate from './CustomerUpdate';
import CustomerDelete from './CustomerDelete';
import Filter from './Filter';
import { VscFoldDown, VscFoldUp } from 'react-icons/vsc';
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction, deleteAction } from ".././redux/reducer";


export default function CustomerForm() {
    
    const dispatch = useDispatch();
    const FormOpen = useSelector((state) => state.app.toggleForm);
    const id = useSelector((state) => state.app.id);
    const isDelete = useSelector((state) => state.app.toggleDelete);

    const handler = async () => {
        if (FormOpen && id) {
            await dispatch(updateAction(undefined));
        }
        await dispatch(toggleChangeAction());
        await dispatch(deleteAction(undefined));
    }
    
    return (
        <div className="container mx-auto">
            <div className='flex justify-between px-1 py-1 border-b'> 
                <div className='left flex'>
                    <button onClick={handler}
                    className='flex w-48 justify-center text-md bg-blue-500 text-white px-4 py-2 border rounded-xl hover:bg-blue-700 hover:text-white hover:border-blue-700 '>
                        { FormOpen ? <span className='my-auto mx-1'><VscFoldUp /></span> 
                        : <span className='my-auto mx-1'><VscFoldDown /></span>  }
                        <span className="my-auto mx-1">{FormOpen ? "Close" : "Add Customer"}</span>
                    </button>
                </div>
                <div className='flex w-2/6'>{!FormOpen && !isDelete ? <Filter /> : <></>}</div>
                <div className='right flex'>{isDelete && <CustomerDelete />}</div>
            </div>
            <div>{FormOpen && (id ? <CustomerUpdate/> : <CustomerCreate />)}</div>
        </div>
    )
}
