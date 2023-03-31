"use client"
import Header from ".././components/Header";
import CustomerForm from ".././components/CustomerForm";
import Table from ".././components/Table";


export default function Home() {
  return (
      <div className='w-full overflow-hidden'>
        <Header />
        <CustomerForm />
        <Table />
      </div>
  )
}
