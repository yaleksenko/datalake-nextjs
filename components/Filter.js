import { useDispatch, useSelector } from "react-redux";
import { filterAction } from ".././redux/reducer";
import { filterCustomers } from ".././lib/helper";


export default function Filter() {
    
    const dispatch = useDispatch();
    const filter = useSelector(state => state.app.filter);

    const onFilterChange = async (event) => {
        dispatch(filterAction(event.target.value));
        const filteredCustomers = await filterCustomers(event.target.value, dispatch);
    };

    return (
        <div className='container mx-auto'>
            <input 
            type='text' 
            name="filter" 
            value={filter} 
            onChange={onFilterChange}
            placeholder='Search' 
            className='border border-gray-400 w-full py-2 px-4 rounded-xl focus:border-blue-500 focus:border-2 focus:outline-none'
            />
        </div>
    )
  }

