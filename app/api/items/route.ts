import { putItem } from "@/services/DynamoDBService";
import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";

interface Item {
  id: string;
  name: string;
  description: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const item: Item = { id: uuidv4(), ...req.body };
  try {
    await putItem(item);
    res.status(200).json({ message: "Item added successfully", item });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
}
