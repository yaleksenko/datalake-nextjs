import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../.././lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();

  // type of request
  const { method } = req;

  // GET http://localhost:3000/api/customer/1
  // Find one customer
  if (method === 'GET') {
    try {
      const id = req.query.id as string;
      const query = { _id: new ObjectId(id) };

      const customer = await db.collection('customers').findOne(query);

      if (!customer) return res.status(404).json({ message: 'Customer not found' });

      res.status(200).json({ customer });

    } catch (error) {
      res.status(404).json({ error: 'Error retrieving customer' });
    }

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


