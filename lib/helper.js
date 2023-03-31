import { 
  setFilteredCustomers 
} from '.././redux/reducer';

// NEXT_PUBLIC_BASE_URL can be set in Docker-compose.yml / .env file
// const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// If not working with env, write url directly
// const NEXT_PUBLIC_BASE_URL = "https://your-next-public-base-url.com";

const NEXT_PUBLIC_BASE_URL = "http://localhost:3000";

// All customers
export const getCustomers = async () => {
  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/customers`);
  const data = await response.json();
  return data.customer;
}

// Single customer
export const getCustomer = async (id) => {
  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/customer/${id}`);
  const data = await response.json();
  return data.customer;
}

// Add customer
export const addCustomer = async (formData) => {
  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });    
  const data = await response.json();
  return data.customer;
}

// Update customer
export const updateCustomer = async (id, formData) => {
  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/customers/?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });    
  const data = await response.json();
  return data.customer;
}

// Delete customer
export const deleteCustomer = async (id) => {
  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/customers/?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });    
  const data = await response.json();
  return data.customer;
}

// Filter customers
export const filterCustomers = async (filter, dispatch) => {
  const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/customers/?filter=${filter}`);
  const data = await response.json();
  
  // Filtering by full name
  const filteredCustomers = data.customer.filter(customer => {
    const fullName = `${customer.first_name} ${customer.last_name}`.toLowerCase();
    const filterLowerCase = filter.toLowerCase();
    return fullName.includes(filterLowerCase);
  });
  
  // Updating in Redux
  dispatch(setFilteredCustomers(filteredCustomers));
  
  return filteredCustomers;
};