import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as crud_idl, canisterId as crud_id } from 'dfx-generated/crud';

const agent = new HttpAgent();
const crud = Actor.createActor(crud_idl, { agent, canisterId: crud_id });

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  const greeting = await crud.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
