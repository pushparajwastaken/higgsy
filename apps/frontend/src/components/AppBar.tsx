import { Button } from "./ui/button";

export function AppBar() {
  return (
    <div>
      <div className="bg-black flex  text-white justify-between">
        <div className="p-4 text-xl">Higgsfield</div>
        <div className="flex gap-4">
          <div className="flex items-center p-2">
            <Button variant={"outline"}>SignUp</Button>
          </div>
          <div className="flex items-center p-2">
            <Button variant={"outline"}> Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
