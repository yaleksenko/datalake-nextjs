import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();

  // type of request
  const { method } = req;
    
    // GET http://localhost:3000/api/customers/
    // Find all customer
    if (method === "GET") {
      try {
        const customer = await db
        .collection("customers")
        .find().toArray();

        if (!customer) return res.status(404).json({ message:"Customers not found" });
        res.status(200).json({ customer });

      } catch (error) {
        res.status(404).json({error:"Error retrieving customers"});
      }

  // POST http://localhost:3000/api/customers/
  } else if (method === "POST") {
    try {
      const { first_name, last_name, email, phone, address, status, photo, user } = req.body;

      const customer = await db.collection("customers").insertOne({
        first_name,
        last_name,
        email,
        phone,
        address,
        status,
        photo,
        user,
      });

      if (!customer) return res.status(404).json({ message: "Customer not created" });
      res.status(201).json({ customer });

    } catch (error) {
      res.status(404).json({error:"Error creating customer"});
    }
  // PUT http://localhost:3000/api/customers/1
  } else if (method === "PUT") {
    try {
      const id = req.query.id as string;
      const query = { _id: new ObjectId(id) };
      const formData = req.body;

      if (!id) return res.status(404).json({ message: "Customer not found"});

      const customer = await db.collection("customers").updateOne(
        query,
        {$set: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          status: formData.status,
          photo: formData.photo,
          user: formData.user,
        }}
      );

      if (!customer) return res.status(404).json({ message: "Customer not updated" });
      res.status(200).json({ customer });

    } catch (error) {
      res.status(404).json({error:" Error updating customer"});
    }


  // DELETE http://localhost:3000/api/customers/1
  } else if (method === "DELETE") {
    try {
      const id = req.query.id as string;
      const query = { _id: new ObjectId(id) };

      const customer = await db.collection("customers").deleteOne(query);

      if (!customer) return res.status(404).json({ message: "Customer not deleted" });
      res.status(200).json({ message: "Customer deleted" });

    } catch (error) {
      res.status(404).json({error:"Error deleting customer"});
    }

  } else {
      res.status(405).json({ message: "Method not allowed" });
  }
}

