
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TStateInsert, TStateSelect,  stateTable } from "../drizzle/schema";


//CRUD Operations for State entity

//Get all States
export const getStatesServices = async():Promise<TStateSelect[] | null> => {
    return await db.query.stateTable.findMany({});
}

//Get State by ID
export const getStateByIdServices = async(stateId: number):Promise<TStateSelect | undefined> => {
     return await db.query.stateTable.findFirst({
        where: eq(stateTable.stateId, stateId)
    })  
}

// Create a new State
export const createStateServices = async(state: TStateInsert):Promise<string> => {
    await db.insert(stateTable).values(state).returning();
    return "State created successfully 🎉";
}

// Update an existing State
export const updateStateServices= async (stateId: number, user: TStateInsert): Promise<boolean> => {
  const result = await db.update(stateTable).set(user).where(eq(stateTable.stateId, stateId));
  // Safely check for rowCount
  return !!result && typeof result.rowCount === "number" && result.rowCount > 0;
}


// Delete a State

export const deleteStateServices = async(stateId: number):Promise<string> => {
  await db.delete(stateTable).where(eq(stateTable.stateId, stateId));
  return "State deleted successfully 🎉"
}